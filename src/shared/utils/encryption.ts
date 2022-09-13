import Cryptr from "cryptr";
import { JWT_SECRET_KEY } from "../constants/strings";

const cryptr = new Cryptr(JWT_SECRET_KEY!);

class Encryption {
  static encrypt = (value: string) => {
    return cryptr.encrypt(value);
  };

  static decrypt = (value: string) => {
    return cryptr.decrypt(value);
  };
}

export default Encryption;
