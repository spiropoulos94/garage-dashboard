import { MOCK_TOKEN, MOCK_USER_ID, getMockTokenResponse } from "@/app/services/mockService";
import { ONE_DAY, saveToClientCookies, saveToSession } from "@/app/helpers/sessionHelpers";

/**
 * Mock credentials for testing
 */
export const MOCK_CREDENTIALS = {
  email: "email",
  password: "password",
};

/**
 * Checks if the provided credentials match the mock credentials
 * @param email Email to check
 * @param password Password to check
 * @returns Boolean indicating if credentials match
 */
export const isMatchingMockCredentials = (email: string, password: string): boolean => {
  return email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password;
};

/**
 * Handles sign-in for mock mode
 * @param email Email address
 * @param password Password
 * @returns Auth response with status and data
 */
export const handleMockSignIn = async (
  email: string,
  password: string,
): Promise<{ status: number; data?: any; error?: string }> => {
  if (isMatchingMockCredentials(email, password)) {
    // Set up mock session
    saveToClientCookies("client_token", "true", ONE_DAY);
    saveToSession("token", MOCK_TOKEN, ONE_DAY);
    saveToSession("userId", MOCK_USER_ID, ONE_DAY);

    return {
      status: 200,
      data: {
        userId: MOCK_USER_ID,
        success: true,
      },
    };
  }

  // Return error for non-matching credentials
  return {
    status: 401,
    error: "Invalid credentials",
  };
};

/**
 * Gets a mock token response
 * @returns Token response with fake token
 */
export const handleMockTokenRefresh = async () => {
  return getMockTokenResponse();
};
