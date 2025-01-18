import { AuthProvider } from "./context/AuthContext";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Toaster } from "react-hot-toast";
import store from "./store/store";
import { Provider } from "react-redux";
function App() {
  // const { state } = useGlobalState();
  // console.log("THEME: ", state);
  return (
    // <AuthProvider>
    // </AuthProvider>
    // <GlobalStateProvider>
    // </GlobalStateProvider>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster />
    </Provider>
  );
}

export default App;
