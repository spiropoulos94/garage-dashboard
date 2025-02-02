import { DictionaryRoot } from "@/app/(pages)/[lang]/dictionaries/dictionaries";

interface ForgotPasswordMessageProps {
  dictionary: DictionaryRoot;
}

const ForgotPasswordMessage = ({ dictionary }: ForgotPasswordMessageProps) => {
  const authStrings = dictionary.auth;
  return (
    <div className="flex flex-col">
      <div className=" mt-8 text-center text-sm font-normal leading-5 text-gray-500">
        {authStrings.doYouNeedANewPassword}
      </div>
      <div className="mt-0.5 text-center text-sm font-normal leading-5 text-gray-500">
        {authStrings.pleaseContactUs}
      </div>
      <div className="mt-0.5 text-center text-sm font-normal leading-5 text-gray-500">
        werkstattmeister@repareo.de
      </div>
      <div className="mt-0.5 text-center text-sm font-normal leading-5 text-gray-500">
        +49 89-24418-2019
      </div>
    </div>
  );
};

export default ForgotPasswordMessage;
