import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { getItem } from "../utils/storage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import DashboardPage from "../pages/HomePage/DashboardPage/DashboardPage";
import ClientsPage from "..//pages/HomePage/ClientsPage/ClientsPage";
import ProductsPage from "..//pages/HomePage/ProductsPage/ProductsPage";
import SalesPage from "..//pages/HomePage/SalesPage/SalesPage";
import FinancialPage from "../pages/HomePage/FinancialPage/FinancialPage";
import PurchasesSuppliersPage from "../pages/HomePage/PurchasesSuppliersPage/PurchasesSuppliersPage";

export default function App() {
  function ProtectedRoutes({ redirectTo }) {
    const token = getItem("token");

    return token ? <Outlet /> : <Navigate to={redirectTo} />;
  }
  return (
    <div className="routes">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/registrar" element={<RegisterPage />} />
          <Route element={<ProtectedRoutes redirectTo="/" />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/clientes" element={<ClientsPage />} />
            <Route path="/produtos" element={<ProductsPage />} />
            <Route path="/vendas" element={<SalesPage />} />
            <Route path="/financeiro" element={<FinancialPage />} />
            <Route path="/fornecedores" element={<PurchasesSuppliersPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
