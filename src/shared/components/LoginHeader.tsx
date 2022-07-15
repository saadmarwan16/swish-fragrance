import { FunctionComponent } from "react";
import LogoAvatar from "./LogoAvatar";

interface LoginHeaderProps {}

const LoginHeader: FunctionComponent<LoginHeaderProps> = () => {
  return (
    <>
      <LogoAvatar />
      <p className="pt-8 pb-3 text-center custom-heading1">
        Welcome to Swish Fragrance
      </p>
      <p className="pb-8 text-center custom-subtitle1">
        Login into your Admin Account
      </p>
    </>
  );
};

export default LoginHeader;
