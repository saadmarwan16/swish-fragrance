import { FunctionComponent } from "react";
import Image from "next/image";

interface AvatarProps {
  url: string;
  alt: string;
  width: string;
}

const Avatar: FunctionComponent<AvatarProps> = ({ url, alt, width }) => {
  console.log(url);

  return (
    <div className="avatar">
      <div className={width}>
        <Image src={url} layout="fill" alt={alt} className="rounded-lg" />
      </div>
    </div>
  );
};

export default Avatar;
