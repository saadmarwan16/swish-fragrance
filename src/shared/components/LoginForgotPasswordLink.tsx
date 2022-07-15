import Link from "next/link";
import { FunctionComponent } from "react";
import Routes from "../constants/routes";

interface LoginForgotPasswordLinkProps {}

const LoginForgotPasswordLink: FunctionComponent<
  LoginForgotPasswordLinkProps
> = () => {
  return (
    <Link href={Routes.FORGOT_PASSWORD}>
      <a className="text-sm text-center text-primary">Forgot your Password?</a>
    </Link>
  );
};

export default LoginForgotPasswordLink;
