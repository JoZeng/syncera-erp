import AuthForm from "../../components/AuthForm/AuthForm.jsx";
import { setItem } from "../../utils/storage";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../services/api";
import { useState } from "react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [errorEmail, setErrorEmail] = useState("");

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Digite um e-mail válido")
      .required("Este campo deve ser preenchido"),
    password: yup
      .string()
      .min(6, "Precisa de pelo menos 6 caracteres")
      .required("Este campo deve ser preenchido"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    try {
      const response = await api.post("/login", {
        email: data.email,
        senha: data.password,
      });

      const { usuario, token } = response.data;

      setItem("token", token);
      setItem("userId", usuario.id);
      setItem("userName", usuario.nome);
      setItem("userEmail", usuario.email);
      navigate("/dashboard");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.mensagem
      ) {
        setErrorEmail(error.response.data.mensagem);
      } else {
        console.error("Erro inesperado ao cadastrar:", error);
        setErrorEmail(
          "Ocorreu um erro inesperado ao cadastrar. Tente novamente."
        );
      }
    }
  }

  return (
    <AuthForm
      text1={"Faça Login"}
      onSubmit={handleSubmit(onSubmit)}
      firstInputProps={{
        ...register("email"),
      }}
      firstError={errors.email || errorEmail}
      secondInputProps={{
        ...register("password"),
      }}
      secondError={errors.password}
      button1={"Entrar"}
      text2={"Esqueceu sua senha?"}
      text3={"Não tem uma conta? "}
      navigate={() => navigate("/registrar")}
      text4={"Crie uma aqui"}
    />
  );
}
