import type { NextPage } from "next";
import LogoAvatar from "../../src/shared/components/LogoAvatar";
import MetaTags from "../../src/shared/components/MetaTags";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { MdOutlineVisibility } from "react-icons/md";
import { useState } from "react";
import Link from "next/link";
import loginController from "../../src/modules/admin/login/login_controller";
import { observer } from "mobx-react-lite";
// import { toast, ToastContainer } from "react-toast";
import { toast } from "react-toastify";

interface AdminLoginPageProps {}

const AdminLogin: NextPage<AdminLoginPageProps> = ({}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  return (
    <>
      <MetaTags titlePrefix="Login - Admin" />

      <div className="flex flex-col items-center justify-center w-full min-h-screen">
        <div className="flex flex-col items-center w-4/5 sm:w-3/5 md:w-2/5 lg:w-2/6">
          <LogoAvatar />
          <p className="pt-8 pb-3 text-xl font-semibold leading-6 text-center sm:text-2xl lg:text-3xl">
            Welcome to Swish Fragrance
          </p>
          <p className="pb-8 text-sm text-center text-gray-600 sm:text-base">
            Login into your Admin Account
          </p>

          <div className="flex flex-col items-center w-full gap-6">
            <div className="flex flex-col w-full gap-3">
              <div className="w-full form-control">
                <label className="font-semibold label">
                  <span className="label-text">
                    Username or Email<span className="text-error">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your username or email ..."
                  value={loginController.identifier}
                  onChange={(e) =>
                    loginController.onIdentifierChanged(e.target.value)
                  }
                  className="w-full !outline-none input input-ghost focus:border-primary input-sm sm:input-md bg-base-200"
                />
                {/* <label className="label">
                  <span className="label-text-alt">Alt label</span>
                </label> */}
              </div>

              <div className="w-full form-control ">
                <label className="font-semibold label">
                  <span className="label-text">
                    Password<span className="text-error">*</span>
                  </span>
                </label>
                <div className="input-group input-group-sm ">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="Enter password ..."
                    value={loginController.password}
                    onChange={(e) =>
                      loginController.onPasswordChanged(e.target.value)
                    }
                    className="w-full !outline-none input input-ghost focus:border-primary input-sm sm:input-md bg-base-200"
                  />
                  {isPasswordVisible ? (
                    <button
                      className="px-2 sm:px-4 bg-base-300"
                      onClick={togglePasswordVisibility}
                    >
                      <AiOutlineEyeInvisible className="text-lg sm:text-xl" />
                    </button>
                  ) : (
                    <button
                      className="px-2 sm:px-4 bg-base-300"
                      onClick={togglePasswordVisibility}
                    >
                      <MdOutlineVisibility className="text-lg sm:text-xl" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            <button
              className={`btn btn-block btn-primary btn-sm ${
                loginController.isLoggingIn && "loading"
              }`}
              onClick={loginController.onLoginButtonClicked}
            >
              Login
            </button>

            <Link href="/admin">
              <a className="text-sm text-center text-primary">
                Forgot your Password?
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default observer(AdminLogin);
