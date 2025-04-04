import { getTokenFromSession, getUserIdFromSession } from "@/app/helpers/sessionHelpers";
import {
  generateMockFilePath,
  getMockData,
  isInMockMode,
  saveMockData,
  createMockResponse,
} from "@/app/services/mockService";

export interface ErrorResponse {
  error: true;
  message: string;
}

/**
 * Performs the actual API request, or returns mock data if in mock mode
 * This is a wrapper around the fetch API that adds mock functionality
 */
export const interceptApiRequest = async <T>(
  endpoint: string,
  options: {
    method?: string;
    params?: Record<string, string | number | string[]>;
    headers?: Record<string, string>;
    body?: any;
    apiBaseUrl?: string;
  } = {},
): Promise<T | ErrorResponse> => {
  const {
    method = "GET",
    params,
    headers = { Accept: "application/json" },
    body,
    apiBaseUrl,
  } = options;

  // Get current token to check for mock mode
  const token = getTokenFromSession();
  const mockMode = isInMockMode(token);

  // Generate mock file path
  const mockFilePath = generateMockFilePath(method, endpoint);

  // Check if mock data exists
  const mockData = getMockData(mockFilePath);

  // If in mock mode or mock data exists, return the mock data
  if (mockMode || mockData) {
    if (mockData) {
      console.log(`[MOCK] Returning mock data for ${method} ${endpoint}`);
      return mockData;
    } else if (mockMode) {
      console.log(`[MOCK] No mock data found for ${method} ${endpoint} but in mock mode`);
      // Return empty data in mock mode
      return {} as T;
    }
  }

  // If not in mock mode, proceed with the actual API request
  const baseUrl = apiBaseUrl + endpoint;
  const queryParams = params
    ? new URLSearchParams(
        Object.entries(params).flatMap(([key, value]) =>
          Array.isArray(value) ? value.map((v) => [`${key}[]`, String(v)]) : [[key, String(value)]],
        ),
      ).toString()
    : "";
  const fetchUrl = queryParams ? `${baseUrl}?${queryParams}` : baseUrl;

  try {
    // Add user ID to headers
    const userId = getUserIdFromSession();
    const requestHeaders: Record<string, string> = {
      ...headers,
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    if (userId) {
      requestHeaders["X-Repareo-UserId"] = userId;
    }

    const res = await fetch(fetchUrl, {
      method,
      headers: requestHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (res.ok) {
      const data = res.status === 204 ? { ok: true } : await res.json();

      // Save response to mock file for future use
      saveMockData(mockFilePath, data);

      return data;
    } else {
      return {
        error: true,
        message: `Error while making request to ${endpoint}. Status: ${res.status} Message: ${res.statusText} Response: ${await res.text()}`,
      } as ErrorResponse;
    }
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    if (mockMode) {
      // Return empty data in mock mode even if there's an error
      return {} as T;
    }
    throw error;
  }
};
