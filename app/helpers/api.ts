import { fetchWithUserId } from "@/app/actions/token";
import { getFromSession } from "@/app/helpers/sessionHelpers";
import fs from "fs";
import path from "path";

const REPAREO_DASHBOARD_API = process.env.REPAREO_DASHBOARD_API;

export interface ErrorResponse {
  error: true;
  message: string;
}

// Function to check if we're in mock mode
const isInMockMode = () => {
  // Check if we're using the mock credentials
  const token = getFromSession("token");
  return token === "FAKE_TOKEN";
};

// Function to generate a safe filename
const generateMockFilePath = (method: string, endpoint: string) => {
  const sanitizedEndpoint = endpoint.replace(/[^a-zA-Z0-9]/g, "_"); // Replace special chars
  const folderPath = path.join(process.cwd(), "mock-data");
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true }); // Ensure the folder exists
  }
  return path.join(folderPath, `mock-${method}-${sanitizedEndpoint}.json`);
};

// Function to check if mock data exists
const getMockData = (filePath: string) => {
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  }
  return null;
};

// Function to save API response to a file
const saveMockData = (filePath: string, data: any) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
};

// Updated makeRequest function
export const makeRequest = async <T>(
  endpoint: string,
  options: {
    method?: string;
    params?: Record<string, string | number | string[]>;
    headers?: Record<string, string>;
    body?: any;
  } = {},
): Promise<T | ErrorResponse> => {
  const { method = "GET", params, headers = { Accept: "application/json" }, body } = options;

  const baseUrl = REPAREO_DASHBOARD_API + endpoint;
  const queryParams = params
    ? new URLSearchParams(
        Object.entries(params).flatMap(([key, value]) =>
          Array.isArray(value)
            ? value.map((v) => [`${key}[]`, String(v)]) // Handle arrays correctly
            : [[key, String(value)]],
        ),
      ).toString()
    : "";
  const fetchUrl = queryParams ? `${baseUrl}?${queryParams}` : baseUrl;

  // Generate mock file path
  const mockFilePath = generateMockFilePath(method, endpoint);

  // Check if mock data exists
  const mockData = getMockData(mockFilePath);

  // If we're in mock mode or mock data exists, return the mock data
  if (isInMockMode() || mockData) {
    if (mockData) {
      console.log(`Returning mock data for ${method} ${endpoint}`);
      return mockData;
    } else {
      console.log(`No mock data found for ${method} ${endpoint} but we're in mock mode`);
      // Return empty data based on the endpoint pattern
      // This is a fallback for endpoints that don't have mock data
      // In a real implementation, you would want to create proper mock data files
      return {} as T;
    }
  }

  try {
    const res = await fetchWithUserId(fetchUrl, {
      method,
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (res.ok) {
      const data = res.status === 204 ? { ok: true } : await res.json();

      // Save response to mock file
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
    if (isInMockMode()) {
      // Return empty data in mock mode even if there's an error
      return {} as T;
    }
    throw error;
  }
};
