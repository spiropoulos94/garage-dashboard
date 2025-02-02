import ForgotPasswordMessage from "@/app/components/common/ForgotPasswordMessage";
import { getDictionary } from "../../dictionaries/dictionaries";
import AuthContainer from "@/app/containers/auth/AuthContainer";
import LoginForm from "@/app/containers/auth/forms/LoginForm";

interface LoginPageProps {
  params: {
    lang: string;
  };
}

const Login = async ({ params }: LoginPageProps) => {
  const t = await getDictionary(params.lang || "en_US");
  return (
    <AuthContainer>
      <h3 className="mb-8 text-center text-3xl font-extrabold leading-9">
        {t.auth.garageDashboardLogin}
      </h3>
      <LoginForm className="w-full " />
      <ForgotPasswordMessage dictionary={t} />
    </AuthContainer>
  );
};

export default Login;
