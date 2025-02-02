import Image from "next/image";

type AuthContainerProps = {
  children: React.ReactNode;
};

const AuthContainer = ({ children }: AuthContainerProps) => {
  return (
    <div className="authContainer mx-auto flex h-screen max-w-md flex-col items-center justify-start pt-12 sm:justify-center sm:pt-0">
      <div className="mb-6">
        <Image alt="Logo" src={"/images/png/logoBlack.png"} width={185} height={48} />
      </div>
      {children}
    </div>
  );
};

export default AuthContainer;
