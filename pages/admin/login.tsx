import type { NextPage } from "next";
import MetaTags from "../../src/shared/components/MetaTags";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { SubmitHandler, useForm } from "react-hook-form";
import FormBottomLabel from "../../src/shared/components/FormBottomLabel";
import { ILoginInputs } from "../../src/shared/types/interfaces";
import FormTopLabel from "../../src/shared/components/FormTopLabel";
import LoginHeader from "../../src/shared/components/LoginHeader";
import PasswordVisibilityButton from "../../src/shared/components/PasswordVisibilityButton";
import FormSubmitButton from "../../src/shared/components/FormSubmitButton";
import LoginForgotPasswordLink from "../../src/shared/components/LoginForgotPasswordLink";
import loginController from "../../src/modules/login/controllers/login_controller";

interface AdminLoginPageProps {}

const AdminLogin: NextPage<AdminLoginPageProps> = ({}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginInputs>();

  const onSubmit: SubmitHandler<ILoginInputs> = (data) =>
    loginController.onLoginButtonClicked(data);
  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  return (
    <>
      <MetaTags titlePrefix="Login - Admin" />

      <div className="flex-col custom-full-screen custom-flex-center">
        <div className="flex-col w-4/5 custom-flex-center sm:w-3/5 md:w-2/5 lg:w-2/6">
          <LoginHeader />

          <form
            className="flex flex-col items-center w-full gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col w-full gap-3">
              <div className="w-full form-control">
                <FormTopLabel
                  content={
                    <>
                      Identifier<span className="text-error">*</span>(Username
                      or Email)
                    </>
                  }
                />
                <input
                  type="text"
                  placeholder="Enter your username or email ..."
                  {...register("identifier", {
                    required: "Identifier is required",
                  })}
                  className={`custom-input ${
                    errors.identifier && "!border-error"
                  }`}
                />

                {errors.identifier && (
                  <FormBottomLabel message={errors.identifier.message!} />
                )}
              </div>

              <div className="w-full form-control ">
                <FormTopLabel
                  content={
                    <>
                      Password<span className="text-error">*</span>
                    </>
                  }
                />
                <div className="custom-input-group">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="Enter password ..."
                    {...register("password", {
                      required: "Password is required",
                    })}
                    className={`custom-input ${
                      errors.password && "!border-error"
                    }`}
                  />

                  <PasswordVisibilityButton
                    isPasswordVisible={isPasswordVisible}
                    togglePasswordVisibility={togglePasswordVisibility}
                  />
                </div>

                {errors.password && (
                  <FormBottomLabel message={errors.password.message!} />
                )}
              </div>
            </div>

            <FormSubmitButton />
            <LoginForgotPasswordLink />
          </form>
        </div>
      </div>
    </>
  );
};

export default observer(AdminLogin);
