"use server";

import { fetchToken, fetchWithToken, TokenResponse } from "@/app/actions/token";
import {
  getTokenFromSession,
  ONE_DAY,
  saveToClientCookies,
  saveToSession,
} from "@/app/helpers/sessionHelpers";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const REPAREO_DASHBOARD_API = process.env.REPAREO_DASHBOARD_API || "";

export const signIn = async (email: string, password: string) => {
  try {
    if (!getTokenFromSession()) {
      console.log("no token in session, refreshing token");
      await refreshTokenOnSession();
    }

    const res = await fetchWithToken(REPAREO_DASHBOARD_API + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const resData = await res.json();

    if (res.ok) {
      const userId = resData.userId;
      saveToSession("userId", userId, ONE_DAY);
      return {
        status: res.status,
        data: resData,
      };
    } else {
      return {
        status: res.status || 400,
        error: res.statusText || "Something went wrong with the fetch request.",
        data: resData || null,
      };
    }
  } catch (error) {
    return {
      status: 500,
      error: (error as Error).message,
    };
  }
};

// deepLink is the path to redirect to after loging back in
export const logOut = async (deepLink?: string) => {
  cookies().delete("userId");
  cookies().delete("token");
  cookies().delete("client_token");
  if (deepLink) {
    redirect(`/login?redirectTo=${deepLink}`);
  } else {
    redirect(`/login`);
  }
};

export const refreshTokenOnSession = async (): Promise<TokenResponse> => {
  // get token using oauth credentials
  const token = await fetchToken();

  saveToClientCookies("client_token", "true", token.expires_in);
  saveToSession("token", token.access_token, token.expires_in);

  return token;
};
