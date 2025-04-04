import fs from "fs";
import path from "path";

// Constants
export const MOCK_TOKEN = "FAKE_TOKEN";
export const MOCK_USER_ID = "04525c34_c116_4ec0_a30b_d9de7c2b5541";

/**
 * Checks if the current session is in mock mode
 * @param token The session token
 * @returns Boolean indicating if in mock mode
 */
export const isInMockMode = (token: string): boolean => {
  return token === MOCK_TOKEN;
};

/**
 * Generates a file path for mock data
 * @param method HTTP method (GET, POST, etc.)
 * @param endpoint API endpoint
 * @returns Path to the mock data file
 */
export const generateMockFilePath = (method: string, endpoint: string): string => {
  const sanitizedEndpoint = endpoint.replace(/[^a-zA-Z0-9]/g, "_"); // Replace special chars
  const folderPath = path.join(process.cwd(), "mock-data");
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true }); // Ensure the folder exists
  }
  return path.join(folderPath, `mock-${method}-${sanitizedEndpoint}.json`);
};

/**
 * Retrieves mock data from a file
 * @param filePath Path to the mock data file
 * @returns Mock data object or null if not found
 */
export const getMockData = (filePath: string): any => {
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  }
  return null;
};

/**
 * Saves API response to a mock data file
 * @param filePath Path to save the mock data
 * @param data Data to save
 */
export const saveMockData = (filePath: string, data: any): void => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
};

/**
 * Creates a mock response with the given data
 * @param data Response data
 * @param status HTTP status code
 * @returns Mocked Response object
 */
export const createMockResponse = (data: any = {}, status: number = 200): Response => {
  return new Response(JSON.stringify(data), {
    status,
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  });
};

/**
 * Generates a mock token response
 * @returns Mock token response object
 */
export const getMockTokenResponse = (): { access_token: string; expires_in: number } => {
  return {
    access_token: MOCK_TOKEN,
    expires_in: 86400, // One day in seconds
  };
};
