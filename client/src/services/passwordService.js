import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const PasswordService = {
  async decryptPassword(iv, password) {
    try {
      const response = await axios.post(
        `${API_URL}/api/logins/decryptpassword`,
        { iv, password },
        {
          withCredentials: true,
        }
      );
      console.log("RESPONSE: ", response);
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

export default PasswordService;
