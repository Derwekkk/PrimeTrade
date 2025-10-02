import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AuthLayout from "../../templates/AuthLayout/AuthLayout";
import LoginForm from "../../organisms/LoginForm/LoginForm";
import { authService } from "../../../services/api/authService";
import { useAuth } from "../../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth();

  useEffect(() => {
    if (user) {
      console.log("User already logged in, redirecting to dashboard");
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const handleLogin = async (credentials) => {
    try {
      console.log("Attempting login with:", credentials);
      const response = await authService.login(credentials);
      console.log("Full login response:", response);
      console.log("Response data:", response.data);

      // Backend returns: { status: 'success', message: '...', data: { user: {...}, token: '...' } }
      const userData = response.data.data.user; // Changed this line
      const token = response.data.data.token; // Changed this line

      console.log("Extracted user:", userData);
      console.log("Extracted token:", token);

      login(userData, token);
      console.log("Login successful, navigating to dashboard");

      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 100);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const handleSwitchToRegister = () => {
    navigate("/register");
  };

  return (
    <AuthLayout>
      <LoginForm
        onSubmit={handleLogin}
        onSwitchToRegister={handleSwitchToRegister}
      />
    </AuthLayout>
  );
};

export default Login;
