import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const AuthService = {
  async register(username, email, password) {
    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, {
        username,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      handleAuthError(error);
    }
  },

  async login(email, password) {
    try {
      const response = await axios.post(
        `${API_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      handleAuthError(error);
    }
  },

  async logout() {
    try {
      const response = await axios.delete(`${API_URL}/api/auth/logout`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      handleAuthError(error);
    }
  },

  async getAuth() {
    try {
      const response = await axios.get(`${API_URL}/api/auth/user`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      handleAuthError(error);
    }
  },
};

const handleAuthError = (error) => {
  const errorMessage = error.response ? error.response.data : error.message;
  console.error(errorMessage);
  throw new Error(errorMessage);
};

export default AuthService;
