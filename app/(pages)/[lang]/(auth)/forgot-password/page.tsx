import AuthContainer from "@/app/containers/auth/AuthContainer";
import ForgotPasswordContainer from "@/app/containers/auth/forms/ForgotPasswordContainer";

interface ForgotPasswordPageProps {
  params: {
    lang: string;
  };
}

const ForgotPassword = async ({}: ForgotPasswordPageProps) => {
  return (
    <AuthContainer>
      <ForgotPasswordContainer />
    </AuthContainer>
  );
};

export default ForgotPassword;
