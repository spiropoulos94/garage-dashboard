import { NextRequest } from "next/server";
import { MOCK_TOKEN } from "./mockService";

/**
 * Checks if the request is in mock mode based on cookies
 * @param request Next.js request object
 * @returns Boolean indicating if in mock mode
 */
export const isRequestInMockMode = (request: NextRequest): boolean => {
  const cookies = request.cookies;
  return cookies.get("token")?.value === MOCK_TOKEN;
};

/**
 * Handles API requests in middleware for mock mode
 * @param request Next.js request object
 * @returns null to continue or error response
 */
export const handleMockApiRequest = (request: NextRequest) => {
  // Allow access to all API requests in mock mode
  return null;
};
