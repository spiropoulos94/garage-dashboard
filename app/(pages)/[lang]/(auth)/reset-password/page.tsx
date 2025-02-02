import AuthContainer from "@/app/containers/auth/AuthContainer";
import { getDictionary } from "../../dictionaries/dictionaries";
import AssignNewPasswordForm from "@/app/containers/auth/forms/AssignNewPasswordForm";

interface ResetPasswordPageProps {
  params: {
    lang: string;
  };
}

const ResetPasswordPage = async ({ params }: ResetPasswordPageProps) => {
  const t = await getDictionary(params.lang || "en_US");
  return (
    <AuthContainer>
      <h3 className="mb-8 text-center text-3xl font-extrabold leading-9">
        {t.auth.assignNewPassword}
      </h3>
      <AssignNewPasswordForm className="w-full" />
    </AuthContainer>
  );
};

export default ResetPasswordPage;
