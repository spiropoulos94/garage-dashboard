"use client";

import { DictionaryRoot } from "@/app/(pages)/[lang]/dictionaries/dictionaries";
import Card from "@/app/components/common/Card";
import Button from "@/app/components/common/buttons/Button";
import TextInput from "@/app/components/common/inputs/TextInput";
import { useDictionaryContext } from "@/app/contexts/DictionaryContext";
import Image from "next/image";
import { title } from "process";
import { useState } from "react";

interface AssignNewPasswordFormProps {
  className: string;
}

const AssignNewPasswordForm = ({ className }: AssignNewPasswordFormProps) => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const dictionary = useDictionaryContext().auth;

  const validations = [
    {
      title: dictionary.atLeast16Characters,
      isValid: password.length >= 16,
    },
    {
      title: dictionary.aSpecialCharacter,
      isValid: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
  ];

  return (
    <Card className={`loginForm ${className} bg-white`}>
      <div className="loginFormContent px-3 py-2">
        <p className="mb-6 text-center text-sm font-normal leading-5">
          {dictionary.pleaseEnterNewPassword}
        </p>
        <div className="space-y-6">
          <div>
            <TextInput
              name="password"
              type="password"
              label={dictionary.password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="validation mt-4 space-y-2">
              {validations.map(({ title, isValid }, index) => (
                <div key={index} className="flex">
                  {isValid ? (
                    <i className="fa-thin fa-check text-green-500"></i>
                  ) : (
                    <i className="fa-solid fa-circle-x text-red-500"></i>
                  )}
                  <div
                    className={`ml-2.5 text-sm font-medium leading-5 ${isValid ? "text-gray-700" : "text-gray-500"}`}
                  >
                    {title}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <TextInput
            name="password"
            type="password"
            label={dictionary.confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="formButtons space mt-6 flex flex-col space-y-6">
          <Button size="fullwidth" title={dictionary.sendEmail} />
        </div>
      </div>
    </Card>
  );
};

export default AssignNewPasswordForm;
