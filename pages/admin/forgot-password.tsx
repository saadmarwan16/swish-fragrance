import type { NextPage } from "next";
import MetaTags from "../../src/shared/components/MetaTags";

interface ForgotPasswordPageProps {}

const ForgotPassword: NextPage<ForgotPasswordPageProps> = ({}) => {
  return (
    <>
      <MetaTags titlePrefix="Forgot Password - Admin" />
      
      <div className="text-4xl font-semibold">
        Forgot Password View is working
      </div>
    </>
  );
};

export default ForgotPassword;
