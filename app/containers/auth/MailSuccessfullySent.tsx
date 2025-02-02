import Button from "@/app/components/common/buttons/Button";
import { useDictionaryContext } from "@/app/contexts/DictionaryContext";

type MailSuccessfullySentProps = {};

const MailSuccessfullySent = ({}: MailSuccessfullySentProps) => {
  const dictionary = useDictionaryContext().auth;
  return (
    <div className="flex flex-col items-center">
      <p className="mb-16 text-center text-sm font-normal leading-5 ">
        {dictionary.weHaveSentYouAnEmailToResetPassword}
      </p>
      <div className="mb-16 text-5xl">📨</div>
      <Button
        color="plain"
        href="/login"
        iconLeft={<i className="fa-regular fa-chevron-left text-lg"></i>}
        title={"Back to login"}
      />
    </div>
  );
};

export default MailSuccessfullySent;
