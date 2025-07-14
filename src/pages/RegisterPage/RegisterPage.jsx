// src/pages/RegisterPage/RegisterPage.jsx
// ESTE ARQUIVO NÃO PRECISA DE MUDANÇAS ADICIONAIS

import AuthForm from "../../components/AuthForm/AuthForm.jsx";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../services/api";
import { useState } from "react";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [errorEmail, setErrorEmail] = useState("");

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Formato de e-mail inválido")
      .required("Este campo deve ser preenchido"),
    password: yup
      .string()
      .min(6, "A senha precisa ter pelo menos 6 caracteres")
      .required("Este campo deve ser preenchido"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  async function onSubmit(data) {
    setErrorEmail("");
    console.log("Dados enviados:", data);
    console.log("Submit iniciado!"); // Este log deve aparecer no console do navegador agora
    try {
      const response = await api.post("/usuario", {
        email: data.email,
        senha: data.password,
      });

      if (response.status === 201 || response.status === 200) {
        console.log("Usuário cadastrado com sucesso!", response.data);
        reset();
        navigate("/");
      } else {
        console.log(
          "Resposta inesperada do servidor:",
          response.status,
          response.data
        );
        setErrorEmail(
          response.data?.mensagem || "Não foi possível cadastrar o usuário."
        );
      }
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
      text1={"Crie sua conta"}
      onSubmit={handleSubmit(onSubmit)} // Continua passando corretamente
      firstInputProps={{
        ...register("email"),
      }}
      firstError={errors.email || errorEmail}
      secondInputProps={{
        ...register("password"),
      }}
      secondError={errors.password}
      text2={"Esqueceu sua senha?"}
      text3={"Já tem uma conta? "}
      navigate={() => navigate("/")}
      button1={"Criar conta"}
      text4={"Faça o login aqui."}
    />
  );
}
