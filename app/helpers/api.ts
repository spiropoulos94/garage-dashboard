import { fetchWithUserId } from "@/app/actions/token";
import { getFromSession } from "@/app/helpers/sessionHelpers";
import fs from "fs";
import path from "path";
import { interceptApiRequest } from "@/app/services/mockApiInterceptor";

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

// Updated makeRequest function that uses the interceptor
export const makeRequest = async <T>(
  endpoint: string,
  options: {
    method?: string;
    params?: Record<string, string | number | string[]>;
    headers?: Record<string, string>;
    body?: any;
  } = {},
): Promise<T | ErrorResponse> => {
  // Pass the request to the interceptor with the API base URL
  return interceptApiRequest<T>(endpoint, {
    ...options,
    apiBaseUrl: REPAREO_DASHBOARD_API,
  });
};
