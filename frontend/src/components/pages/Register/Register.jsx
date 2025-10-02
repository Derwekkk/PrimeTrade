import { useNavigate } from "react-router-dom";
import AuthLayout from "../../templates/AuthLayout/AuthLayout";
import RegisterForm from "../../organisms/RegisterForm/RegisterForm";
import { authService } from "../../../services/api/authService";
import { useAuth } from "../../../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRegister = async (userData) => {
    const response = await authService.register(userData);
    login(response.data.user, response.data.token);
    navigate("/dashboard");
  };

  const handleSwitchToLogin = () => {
    navigate("/login");
  };

  return (
    <AuthLayout>
      <RegisterForm
        onSubmit={handleRegister}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </AuthLayout>
  );
};

export default Register;
