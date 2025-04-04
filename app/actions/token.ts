"use server";

import { getTokenFromSession, getUserIdFromSession } from "@/app/helpers/sessionHelpers";

const OAUTH_ENDPOINT = process.env.OAUTH_ENDPOINT || "";
const OAUTH_CLIENT_ID = process.env.OAUTH_CLIENT_ID || "";
const OAUTH_CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET || "";

export interface TokenResponse {
  access_token: string;
  expires_in: number;
}

// Function to check if we're in mock mode
const isInMockMode = () => {
  // Check if we're using the mock credentials
  const token = getTokenFromSession();
  return token === "FAKE_TOKEN";
};

export async function fetchToken(): Promise<TokenResponse> {
  // If we're in mock mode, return a fake token
  if (isInMockMode()) {
    return {
      access_token: "FAKE_TOKEN",
      expires_in: 86400, // One day in seconds
    };
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

  const headers = Object.assign({}, options.headers, {
    Authorization: `Bearer ${token}`,
  });

  // Merge options with custom headers
  const requestOptions: RequestInit = Object.assign({}, options, { headers });

  try {
    // If in mock mode and this is not a dev/test API, fake the response
    if (isInMockMode() && !url.toString().includes("/api/health")) {
      // Create a mock response
      return new Response(JSON.stringify({}), {
        status: 200,
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });
    }

    const response: Response = await fetch(url, requestOptions);
    return response;
  } catch (error) {
    // If in mock mode, return a successful empty response
    if (isInMockMode()) {
      return new Response(JSON.stringify({}), {
        status: 200,
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });
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
