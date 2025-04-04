"use server";

import { getTokenFromSession, getUserIdFromSession } from "@/app/helpers/sessionHelpers";
import { isInMockMode, createMockResponse } from "@/app/services/mockService";
import { handleMockTokenRefresh } from "@/app/services/mockAuthService";

const OAUTH_ENDPOINT = process.env.OAUTH_ENDPOINT || "";
const OAUTH_CLIENT_ID = process.env.OAUTH_CLIENT_ID || "";
const OAUTH_CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET || "";

export interface TokenResponse {
  access_token: string;
  expires_in: number;
}

export async function fetchToken(): Promise<TokenResponse> {
  // Check if in mock mode
  const token = getTokenFromSession();
  if (isInMockMode(token)) {
    return handleMockTokenRefresh();
  }

  const url = OAUTH_ENDPOINT + "/token";
  const clientId = OAUTH_CLIENT_ID;
  const clientSecret = OAUTH_CLIENT_SECRET;

  const body = new URLSearchParams();
  body.append("grant_type", "client_credentials");
  body.append("client_id", clientId);
  body.append("client_secret", clientSecret);

  const requestOptions: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body,
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(
        `Error while fetching token! Status: ${response.status} Message: ${response.statusText}`,
      );
    }

    const responseData: TokenResponse = await response.json();

    return responseData;
  } catch (error) {
    throw error;
  }
}

// fetchWithToken uses token from session to make authenticated requests
export async function fetchWithToken(
  url: string | URL,
  options: RequestInit = {},
): Promise<Response> {
  // Merge custom headers with options headers
  const token = getTokenFromSession();
  if (token === "") {
    throw new Error("Token not found");
  }

  // Check if in mock mode for non-health endpoints
  if (isInMockMode(token) && !url.toString().includes("/api/health")) {
    return createMockResponse();
  }

  const headers = Object.assign({}, options.headers, {
    Authorization: `Bearer ${token}`,
  });

  // Merge options with custom headers
  const requestOptions: RequestInit = Object.assign({}, options, { headers });

  try {
    const response: Response = await fetch(url, requestOptions);
    return response;
  } catch (error) {
    // Use mock response in mock mode on error
    if (isInMockMode(token)) {
      return createMockResponse();
    }
    throw error;
  }
}

// fetchWithUserId uses Token and UserId from session to make authenticated and authorized requests
export async function fetchWithUserId(
  url: string | URL,
  options: RequestInit = {},
): Promise<Response> {
  // Retrieve the userId from session
  const userId = getUserIdFromSession();
  if (userId === "") {
    throw new Error("UserId not found");
  }

  // Merge custom headers with options headers and add X-Repareo-UserId header
  const customHeaders = Object.assign({}, options.headers, {
    "X-Repareo-UserId": userId,
  });

  // Merge options with custom headers
  const requestOptions: RequestInit = Object.assign({}, options, { headers: customHeaders });

  try {
    // Call fetchWithToken with the modified requestOptions
    const response = await fetchWithToken(url, requestOptions);
    return response;
  } catch (error) {
    throw error;
  }
}
