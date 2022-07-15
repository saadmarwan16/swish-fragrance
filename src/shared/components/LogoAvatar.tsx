import { FunctionComponent } from "react";
import Image from "next/image";

interface LogoAvatarProps {}

const LogoAvatar: FunctionComponent<LogoAvatarProps> = () => {
  return (
    <div className="avatar">
      <div className="w-16 bg-transparent border rounded border-base-300 text-neutral-content">
        <Image src="/images/logo.png" layout="fill" alt="Logo" />
      </div>
    </div>
  );
};

export default LogoAvatar;