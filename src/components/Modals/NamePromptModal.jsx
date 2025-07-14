import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function NamePromptModal({
  isOpen,
  onClose,
  onSaveName,
  isLoading,
}) {
  const schema = yup.object().shape({
    nome: yup.string().required("Por favor, digite seu nome."),
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

  const onSubmit = (data) => {
    onSaveName(data.nome);
    reset(); // Limpa o campo após o envio
  };

  if (!isOpen) return null; // Não renderiza nada se o modal não estiver aberto

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md relative">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          Boas-vindas!
        </h2>
        <p className="text-gray-700 text-center mb-6">
          Parece que você está acessando o sistema pela primeira vez. Por favor,
          nos diga seu nome completo para continuar.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Seu Nome:
            </label>
            <input
              type="text"
              id="name"
              {...register("nome")}
              className={`shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out
                ${
                  errors.nome
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                }
              `}
              placeholder="Digite seu nome completo"
            />
            <div
              className={`h-4 overflow-hidden ${
                errors.nome ? "visible" : "invisible"
              }`}
            >
              <span className="text-red-600 text-xs">
                {errors.nome?.message || " "}
              </span>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
              disabled={isLoading}
            >
              {isLoading ? "Salvando..." : "Salvar Nome"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
