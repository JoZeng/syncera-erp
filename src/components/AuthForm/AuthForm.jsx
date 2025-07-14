export default function AuthForm({
  text1,
  onSubmit,
  label1,
  firstInputProps,
  firstError,
  label2,
  secondInputProps,
  secondError,
  text2,
  button1,
  text3,
  navigate,
  text4,
}) {
  const getErrorMessage = (errorProp) => {
    if (!errorProp) return null;
    return typeof errorProp === "string" ? errorProp : errorProp?.message;
  };

  const currentFirstError = getErrorMessage(firstError);
  const currentSecondError = getErrorMessage(secondError);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 sm:p-10 lg:p-12 border border-gray-200">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Bem-vindo(a)
          </h1>
          <p className="text-gray-600 text-lg">
            {text1} para acessar seu SyncEra ERP
          </p>
        </div>

        <form onSubmit={onSubmit}>
          {/* BLOCO DO PRIMEIRO INPUT (EMAIL) */}
          <div className="mb-4">
            {" "}
            {/* Adicionado mb-4 aqui para espaçar este bloco do próximo */}
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-medium mb-1" /* Reduzido mb-2 para mb-1 */
            >
              {label1 || "Email"}
            </label>
            <input
              type="text"
              {...firstInputProps}
              className={`shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out
                ${
                  currentFirstError
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                }
              `}
              placeholder="email@exemplo.com"
            />
            {/* Contêiner da mensagem de erro - altura bem pequena para o text-xs */}
            <div
              className={`h-6 overflow-hidden ${
                currentFirstError ? "visible" : "invisible"
              }`}
            >
              {" "}
              {/* Altura h-4 (16px) */}
              <span className="text-red-600 text-xs">
                {currentFirstError || " "}
              </span>
            </div>
          </div>

          {/* BLOCO DO SEGUNDO INPUT (SENHA) */}
          <div className="mb-4">
            {" "}
            {/* Adicionado mb-4 aqui para espaçar este bloco do próximo */}
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-medium mb-1" /* Reduzido mb-2 para mb-1 */
            >
              {label2 || "Senha"}
            </label>
            <input
              type="password"
              {...secondInputProps}
              className={`shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out
                ${
                  currentSecondError
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                }
              `}
              placeholder="••••••••"
            />
            {/* Contêiner da mensagem de erro - altura bem pequena para o text-xs */}
            <div
              className={`h-6 overflow-hidden ${
                currentSecondError ? "visible" : "invisible"
              }`}
            >
              {" "}
              {/* Altura h-4 (16px) */}
              <span className="text-red-600 text-xs">
                {currentSecondError || " "}
              </span>
            </div>
          </div>

          {/* Link "Esqueceu sua senha?" - Ajustado mt-1 para ficar próximo ao input/erro */}
          <div className="text-right mt-1 mb-6">
            {" "}
            {/* Adicionado mb-6 para espaçar do botão */}
            <a
              href="#"
              className="inline-block align-baseline font-medium text-sm text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out"
            >
              {text2}
            </a>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
            >
              {button1}
            </button>
          </div>

          <div className="text-center mt-6">
            <p className="text-gray-600 text-sm">
              {text3}
              <a
                onClick={navigate}
                className="font-medium text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer ml-1"
              >
                {text4}
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
