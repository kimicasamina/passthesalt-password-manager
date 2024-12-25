import axiosClient from "../utils/axiosClient";
// Login service
export const loginService = async (email, password) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  try {
    const response = await axios.post(`${apiUrl}/api/auth/login`, {
      email,
      password,
    });

    // Handle success response
    if (response.status === 200) {
      console.log("Login successful: ", response.data);
      return response.data; // Returning the response data, such as a token or user data
    } else {
      throw new Error("Login failed");
    }
  } catch (error) {
    // Handle error responses
    console.error(
      "Login error: ",
      error.response ? error.response.data : error.message
    );
    throw error.response ? error.response.data : error.message; // Throw detailed error message
  }
};

export const registerService = async (username, email, password) => {
  try {
    console.log(`Sending POST request to: ${apiUrl}/api/auth/register`);
    axiosClient.post("/api/auth/register", {
      username,
      email,
      password,
    });
    // const response = await axios.post(
    //   "/api/auth/register",
    //   {
    //     username,
    //     email,
    //     password,
    //   }
    //   // { withCredentials: true }
    // );

    // Handle success response
    if (response.status === 201) {
      console.log("Registration successful: ", response.data);
      return response.data; // Returning user data or confirmation
    } else {
      throw new Error("Registration failed");
    }
  } catch (error) {
    // Handle error responses
    console.error(
      "Registration error: ",
      error.response ? error.response.data : error.message
    );
    throw error.response ? error.response.data : error.message; // Throw detailed error message
  }
};
