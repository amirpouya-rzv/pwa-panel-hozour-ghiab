import AuthLayout from "./layout/auth/AuthLayout";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import AllPage from "./layout/AllPage";

export default function App() {
  const { darkmode } = useSelector(state => state.darkmode);
  const location = useLocation();

  return (
    <div className={darkmode === "dark" ? "dark" : ""}>
      {location.pathname.includes('/auth') ? <AuthLayout /> : <AllPage />}
    </div>
  );
}
