"use client";

import * as Sentry from "@sentry/nextjs";
import { signIn } from "@/app/actions/auth";
import Button from "@/app/components/common/buttons/Button";
import Card from "@/app/components/common/Card";
import TextInput from "@/app/components/common/inputs/TextInput";
import { useDictionaryContext } from "@/app/contexts/DictionaryContext";
import { mapStatusCodeToError } from "@/app/helpers/authHelpers";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type LoginFormProps = {
  className?: string;
};

const LoginForm = ({ className }: LoginFormProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const dictionary = useDictionaryContext().auth;
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  const login = async () => {
    // using server action to login
    setIsLoading(true);
    let res = await signIn(email, password);
    if (res?.status !== 200 || res.error) {
      Sentry.captureException(new Error(res.error));
      const errorKey = mapStatusCodeToError(res?.status);
      setError(dictionary.errors[errorKey]);
      setIsLoading(false);
      return;
    }
    setError("");
    if (redirectTo) {
      router.push(redirectTo);
      return;
    }
    router.push("/bookings");
  };

  return (
    <Card className={`loginForm ${className} bg-white`}>
      <div className="loginFormContent px-3 py-2">
        <div className="space-y-6">
          <TextInput
            name="email"
            label={dictionary.emailAddress}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextInput
            name="password"
            label={dictionary.password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className=" mt-2 text-center text-red-500">{error}</div>}
        <div className="formButtons space mt-6 flex flex-col space-y-6">
          {/* TO BE REVERTED AFTER PASSWORD RESET IS IMPLEMENTED */}
          {/* <Button
            size="fullwidth"
            color="link"
            href="/forgot-password"
            title={dictionary.forgotPassword}
          /> */}
          <Button
            disabled={!Boolean(email) || !Boolean(password)}
            size="fullwidth"
            title={dictionary.logIn}
            onClick={login}
            isLoading={isLoading}
          />
        </div>
      </div>
    </Card>
  );
};

export default LoginForm;
