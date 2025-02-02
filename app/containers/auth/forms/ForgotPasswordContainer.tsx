"use client";

import { DictionaryRoot } from "@/app/(pages)/[lang]/dictionaries/dictionaries";
import { useState } from "react";
import PasswordResetEmailForm from "./PasswordResetEmailForm";
import MailSuccessfullySent from "../MailSuccessfullySent";
import { useDictionaryContext } from "@/app/contexts/DictionaryContext";

type ForgotPasswordContainerProps = {
  children?: React.ReactNode;
};

const ForgotPasswordContainer = ({ children }: ForgotPasswordContainerProps) => {
  const [emailIsSent, setEmailIsSent] = useState<boolean>(false);
  const dictionary = useDictionaryContext().auth;

  return (
    <>
      <h3 className="mb-8 text-center text-3xl font-extrabold leading-9">
        {emailIsSent ? dictionary.youHaveMail : dictionary.forgotPassword}
      </h3>
      {emailIsSent ? (
        <MailSuccessfullySent />
      ) : (
        <PasswordResetEmailForm setEmailIsSent={setEmailIsSent} className="w-full" />
      )}
    </>
  );
};

export default ForgotPasswordContainer;
