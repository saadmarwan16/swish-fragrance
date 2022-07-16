import type { NextPage } from "next";
import MetaTags from "../../src/shared/components/MetaTags";

interface ResetPasswordPageProps {}

const ResetPassword: NextPage<ResetPasswordPageProps> = ({}) => {
  return (
    <>
      <MetaTags titlePrefix="Reset Password - Admin" />

      <div className="text-4xl font-semibold">
        Reset Password View is working
      </div>
    </>
  );
};

export default ResetPassword;
