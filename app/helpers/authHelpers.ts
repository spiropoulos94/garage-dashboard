import { refreshTokenOnSession } from "@/app/actions/auth";
import { ErrorResponse } from "@/app/helpers/api";
import { NextRequest } from "next/server";

// This function wraps a function that makes an authenticated request on the client, and refreshes the token if a 401 response is received
export const withAuthCheck = <T extends (...args: any[]) => Promise<any>>(func: T): T => {
  return (async (...args: Parameters<T>) => {
    try {
      const res = await func(...args);

      if (isErrorResponse(res) && res.message.includes("401")) {
        console.log("401 Unauthorized, refreshing token...");

        const newToken = await refreshTokenOnSession().catch((refreshError) => {
          console.error("Failed to refresh token: ", refreshError);
          return null; // Return null if token refresh fails
        });

        if (!newToken) return res; // Return original error if no new token

        // retry original function with refreshed token
        return await func(...args);
      }

      return res; // Return the original response if no 401 error
    } catch (e) {
      console.error("Request error: ", e);
      throw new Error(`Error during request: ${e instanceof Error ? e.message : "Unknown error"}`);
    }
  }) as T;
};

export const getAuthHeaderValue = (request: NextRequest) => {
  const prefix = "Bearer ";
  const headers = request.headers;

  let authHeader = headers.get("Authorization") || headers.get("authorization");

  if (!authHeader) return "";

  if (authHeader.startsWith(prefix)) {
    return authHeader.slice(prefix.length);
  }
  return authHeader;
};

export const mapStatusCodeToError = (statusCode: number): "credentialsError" | "systemError" => {
  switch (statusCode) {
    case 401:
      return "credentialsError";
    default:
      return "systemError";
  }
};

// Type guard function
export function isErrorResponse(response: any): response is ErrorResponse {
  return response && response.error === true;
}
