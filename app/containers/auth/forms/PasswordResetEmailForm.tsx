"use client";

import { DictionaryRoot } from "@/app/(pages)/[lang]/dictionaries/dictionaries";
import Button from "@/app/components/common/buttons/Button";
import Card from "@/app/components/common/Card";
import TextInput from "@/app/components/common/inputs/TextInput";
import { useDictionaryContext } from "@/app/contexts/DictionaryContext";
import { useState } from "react";

type PasswordResetEmailFormProps = {
  className?: string;
  setEmailIsSent: (value: boolean) => void;
};

const PasswordResetEmailForm = ({ className, setEmailIsSent }: PasswordResetEmailFormProps) => {
  const [email, setEmail] = useState<string>("");
  const dictionary = useDictionaryContext().auth;

  const sendMail = () => {
    setEmailIsSent(true);
  };

  return (
    <Card className={`PasswordResetEmailForm ${className} bg-white`}>
      <div className="PasswordResetEmailFormContent px-3 py-2">
        <p className="pb-6 text-center text-sm font-normal leading-5 text-gray-700">
          {dictionary.resetPasswordMessage}
        </p>
        <div className="space-y-6">
          <TextInput
            name="email"
            label={dictionary.emailAddress}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="formButtons space mt-6 flex flex-col space-y-6">
          <Button
            disabled={!Boolean(email)}
            onClick={() => sendMail()}
            size="fullwidth"
            title={dictionary.sendEmail}
          />
        </div>
      </div>
    </Card>
  );
};

export default PasswordResetEmailForm;
