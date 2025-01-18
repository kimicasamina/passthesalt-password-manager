import React, {
  useEffect,
  createContext,
  useContext,
  useReducer,
  useState,
} from "react";
import AuthService from "../services/authService";
import NoteService from "../services/noteService";
import FolderService from "../services/folderService";
import PasswordService from "../services/passwordService";
import LoadingPage from "../components/LoadingPage";

const GlobalStateContext = createContext();

const initialState = {
  theme: "lightMode",
  user: null,
  passwords: [],
  folders: [],
  notes: [],
  loading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_THEME":
      return {
        ...state,
        theme: state.theme === "lightMode" ? "darkMode" : "lightMode",
      };

    case "SET_USER":
      return { ...state, user: action.payload };

    case "REMOVE_USER":
      return { ...state, user: null };

    case "UPDATE_USER":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };

    case "SET_PASSWORDS":
      return { ...state, passwords: action.payload };

    case "ADD_PASSWORD":
      return { ...state, passwords: [...state.passwords, action.payload] };

    case "REMOVE_PASSWORD":
      return {
        ...state,
        passwords: state.passwords.filter(
          (password) => password.id !== action.payload.id
        ),
      };

    case "UPDATE_PASSWORD":
      return {
        ...state,
        passwords: state.passwords.map((password) =>
          password.id === action.payload.id ? action.payload : password
        ),
      };

    case "SET_FOLDERS":
      return { ...state, folders: action.payload };

    case "ADD_FOLDER":
      return { ...state, folders: [...state.folders, action.payload] };

    case "REMOVE_FOLDER":
      return {
        ...state,
        folders: state.folders.filter(
          (folder) => folder.id !== action.payload.id
        ),
      };

    case "UPDATE_FOLDER":
      return {
        ...state,
        folders: state.folders.map((folder) =>
          folder.id === action.payload.id ? action.payload : folder
        ),
      };

    case "SET_NOTES":
      return { ...state, notes: action.payload };

    case "ADD_NOTE":
      return { ...state, notes: [...state.notes, action.payload] };

    case "REMOVE_NOTE":
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload.id),
      };

    case "UPDATE_NOTE":
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? action.payload : note
        ),
      };

    // Loading state
    case "SET_LOADING":
      return { ...state, loading: action.payload };

    // Error state
    case "SET_ERROR":
      return { ...state, error: action.payload };

    default:
      return state;
  }
}

export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Fetch data from API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        // Fetch user data
        const userData = await AuthService.getCurrentUser();
        dispatch({ type: "SET_USER", payload: userData.user });

        // Fetch folders data
        const foldersData = await FolderService.getAllFolders();
        dispatch({ type: "SET_FOLDERS", payload: foldersData.folders });

        // Fetch notes data
        const notesData = await NoteService.getAllNote();
        dispatch({ type: "SET_NOTES", payload: notesData.notes });

        // Fetch passwords data
        const passwordsData = await PasswordService.getAllPassword();
        dispatch({ type: "SET_PASSWORDS", payload: passwordsData.logins });
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload: error.message || "Failed to fetch data",
        });
        console.error("Error fetching data", error);
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    fetchData();
  }, []); // Only run on mount

  console.log("STATE: ", state);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {state.loading ? <LoadingPage /> : children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
