import { fetchWithUserId } from "@/app/actions/token";

const REPAREO_DASHBOARD_API = process.env.REPAREO_DASHBOARD_API;

export interface ErrorResponse {
  error: true;
  message: string;
}

// makeRequest is a generic function that makes a request to the REPAREO_DASHBOARD_API
// and T is the type of the response data
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
  // const queryParams = params
  //   ? new URLSearchParams(
  //       Object.entries(params).map(([key, value]) => [key, String(value)]),
  //     ).toString()
  //   : "";

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

  try {
    const res = await fetchWithUserId(fetchUrl, {
      method,
      headers: {
        ...headers,
        "Content-Type": "application/json", // Ensure content type is set
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (res.ok) {
      // If the response is a 204 No Content response, return a simple object with ok: true
      if (res.status === 204) {
        return { ok: true } as unknown as T;
      }
      const data = await res.json();
      return data;
    } else {
      return {
        error: true,
        message: `Error while making request to ${endpoint}. Status: ${res.status} Message: ${res.statusText} Response: ${await res.text()}`,
      } as ErrorResponse;
    }
  } catch (error) {
    throw error;
  }
};
