import { parseCookies, setCookie } from "nookies";
import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { IAuthContext } from "../../shared/types/interfaces";
import Encryption from "../../shared/utils/encryption";
import { ConvertUserModel, UserModel } from "./data/models/user_model";

const AuthContext = createContext<IAuthContext>({
  user: null,
  setUser: (user) => {},
});

export const useAuthContext = () => useContext(AuthContext);

const AuthContextProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [user, setUser] = useState<UserModel | null>(null);
  const [userCookies, setUserCookies] = useState<string | null>(
    parseCookies().user
  );

  useEffect(() => {
    if (userCookies) {
      setUser(ConvertUserModel.toUserModel(Encryption.decrypt(userCookies)));
    } else {
      setUser(null);
    }
  }, [userCookies]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser: (user) => {
          const userString = Encryption.encrypt(JSON.stringify(user));
          setCookie(null, "user", userString, {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
          });
          setUserCookies(userString);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
