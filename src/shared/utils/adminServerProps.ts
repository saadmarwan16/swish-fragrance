import nookies from "nookies";
import { ConvertUserModel } from "../../modules/auth/data/models/user_model";
import Routes from "../constants/routes";
import Encryption from "./encryption";

const adminServerProps = async (ctx: any, callback: () => any) => {
  const userString = nookies.get(ctx).user;
  if (!userString) {
    return {
      redirect: {
        destination: Routes.ADMIN_LOGIN,
        permanent: false,
      },
    };
  }

  const user = ConvertUserModel.toUserModel(Encryption.decrypt(userString));
  if (user.role?.name !== "Admin" && user.role?.name !== "Super Admin") {
    return {
      redirect: {
        destination: Routes.ADMIN_LOGIN,
        permanent: false,
      },
    };
  }

  return await callback();
};

export default adminServerProps;
