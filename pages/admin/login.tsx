import type { NextPage } from "next";
import MetaTags from "../../src/shared/components/MetaTags";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { SubmitHandler, useForm } from "react-hook-form";
import { ILoginInputs } from "../../src/shared/types/interfaces";
import LoginHeader from "../../src/shared/components/LoginHeader";
import FormSubmitButton from "../../src/shared/components/FormSubmitButton";
import LoginForgotPasswordLink from "../../src/shared/components/LoginForgotPasswordLink";
import authController from "../../src/modules/auth/controllers/auth_controller";
import errorToast from "../../src/shared/utils/errorToast";
import { useAuthContext } from "../../src/modules/auth/AuthContext";
import { useRouter } from "next/router";
import Routes from "../../src/shared/constants/routes";
import { yupResolver } from "@hookform/resolvers/yup";
import loginSchema from "../../src/shared/constants/schemas/login_schema";
import InputField from "../../src/shared/components/InputField";
import PasswordInputGroupField from "../../src/shared/components/PasswordInputGroupField";

interface AdminLoginPageProps {}

const AdminLogin: NextPage<AdminLoginPageProps> = ({}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const router = useRouter();
  const { setUser } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginInputs>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<ILoginInputs> = (data) => {
    authController.login(data).then((res) => {
      const { error, results } = res;
      if (error) {
        errorToast(error.name, error.message);

        return;
      }

      if (
        results?.role?.name !== "Admin" &&
        results?.role?.name !== "Super Admin"
      ) {
        errorToast("Not an Admin", "This account does not belong to an admin");

        return;
      }

      setUser(results);
      router.push(Routes.ADMIN_DASHBOARD);
    });
  };
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
              <InputField
                label="Identifier(Username
                      or Email)"
                isRequired={true}
                placeholder="Enter your username or email ..."
                register={register("identifier")}
                error={errors.identifier}
              />

              <PasswordInputGroupField
                label="Password"
                isRequired={true}
                placeholder="Enter your password ..."
                register={register("password")}
                error={errors.password}
                state={isPasswordVisible}
                toggleState={togglePasswordVisibility}
              />
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
