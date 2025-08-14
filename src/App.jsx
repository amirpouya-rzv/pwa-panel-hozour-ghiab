import AuthLayout from "./layout/auth/AuthLayout.jsx";
import AllPage from "./layout/AllPage.jsx";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function App() {
  const { darkmode } = useSelector(state => state.darkmode);
  const location = useLocation();

  return (
    <div className={darkmode === "dark" ? "dark" : ""}>
      {location.pathname.includes('/auth') ? <AuthLayout /> : <AllPage />}
    </div>
  );
}
