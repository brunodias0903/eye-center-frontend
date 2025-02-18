import Logo from "@assets/eye-center-logo.svg";
import "@css/SignIn.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import CustomInput from "../components/CustomInput";
import LoginSchema from "../schemas/LoginSchema";

type FormData = z.infer<typeof LoginSchema>;

type LoginFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await login(data);
      navigate("/dashboard");
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  const handleRequestAccess = () => {
    console.log("Redirecionar para solicitação de acesso");
  };

  return (
    <div className="root">
      <img src={Logo} alt="eye-center-logo" width={"25%"} />
      <section className="main-section">
        <div className="text-container">
          <h1 className="welcome-text">SEJA BEM VINDO</h1>
          <h2 className="sign-in-text">Entre na sua conta</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="inputs-container">
          <CustomInput
            label="E-mail"
            type="email"
            {...register("email")}
            error={errors.email?.message}
            onChange={() => clearErrors("email")}
          />

          <CustomInput
            label="Senha"
            type={showPassword ? "text" : "password"}
            isPasswordInput
            showPassword={showPassword}
            onClickIcon={toggleShowPassword}
            onForgotPassword={() =>
              console.log("Redirecionar para recuperação de senha")
            }
            {...register("password")}
            error={errors.password?.message}
            onChange={() => clearErrors("password")}
          />

          <div className="submit-container">
            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Entrando..." : "Entrar"}
            </button>

            <div className="request-access">
              Novo aqui?{" "}
              <span className="bold-text" onClick={handleRequestAccess}>
                Solicite seu acesso
              </span>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
