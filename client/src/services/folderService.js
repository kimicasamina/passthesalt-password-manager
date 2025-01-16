import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const FolderService = {
  async getAllFolders() {
    try {
      const response = await axios.get(`${API_URL}/api/v2/folders/`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  async addNewFolder(name, description) {
    try {
      const response = await axios.post(
        `${API_URL}/api/v2/folders`,
        { name, description },
        { withCredentials: true }
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

export default FolderService;
