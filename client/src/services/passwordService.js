import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const PasswordService = {
  async getAllPassword() {
    try {
      const response = await axios.get(`${API_URL}/api/v2/logins/`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  async addNewPassword(name, username, email, password, website, folder_id) {
    try {
      const response = await axios.post(
        `${API_URL}/api/v2/logins/`,
        { name, username, email, password, website, folder_id },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  async decryptPassword(iv, password) {
    try {
      const response = await axios.post(
        `${API_URL}/api/v2/logins/decryptpassword/`,
        { iv, password },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // async addNewNote(name, content) {
  //   try {
  //     const response = await axios.post(
  //       `${API_URL}/api/v2/notes`,
  //       { name, content },
  //       { withCredentials: true }
  //     );
  //     return response.data;
  //   } catch (error) {
  //     handleError(error);
  //   }
  // },

  async updatePassword(
    passwordId,
    name,
    username,
    email,
    password,
    website,
    folder_id
  ) {
    try {
      const response = await axios.put(
        `${API_URL}/api/v2/logins/${passwordId}`,
        { name, username, email, password, website, folder_id },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  async deletePassword(passwordId) {
    try {
      const response = await axios.delete(
        `${API_URL}/api/v2/logins/${passwordId}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  //   async logout() {
  //     try {
  //       const response = await axios.delete(`${API_URL}/api/v2/auths/logout`, {
  //         withCredentials: true,
  //       });
  //       return response.data;
  //     } catch (error) {
  //       handleAuthError(error);
  //     }
  //   },

  //   async getAuth() {
  //     try {
  //       const response = await axios.get(`${API_URL}/api/v2/auths/me`, {
  //         withCredentials: true,
  //       });
  //       return response.data;
  //     } catch (error) {
  //       handleAuthError(error);
  //     }
  //   },
};

const handleError = (error) => {
  const errorMessage = error.response ? error.response.data : error.message;
  console.error(errorMessage);
  throw new Error(errorMessage);
};

export default PasswordService;
