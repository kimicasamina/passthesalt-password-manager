// src/slices/userDataSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // User info: { id, username, email }
  notes: [], // Array of notes
  logins: [], // Array of logins (passwords)
  folders: [], // Array of folders, each with its own notes and logins
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setInitialData: (state, action) => {
      // Set user and initialize notes, logins, and folders from the payload
      const { user, notes, logins, folders } = action.payload;
      state.user = user;
      state.notes = notes || []; // Ensure notes are set
      state.logins = logins || []; // Ensure logins are set
      state.folders = folders || []; // Ensure folders are set
    },
    // User
    login: (state, action) => {
      state.user = action.payload; // Contains { id, username, email }
    },
    logout: (state) => {
      state.user = null;
      state.notes = [];
      state.logins = [];
      state.folders = [];
    },

    // Notes
    addNote: (state, action) => {
      state.notes.push(action.payload);
    },
    editNote: (state, action) => {
      const index = state.notes.findIndex(
        (note) => note.id === action.payload.id
      );
      if (index >= 0) {
        state.notes[index] = action.payload;
      }
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },

    // Folders
    addFolder: (state, action) => {
      state.folders.push(action.payload);
    },
    editFolder: (state, action) => {
      const index = state.folders.findIndex(
        (folder) => folder.id === action.payload.id
      );
      if (index >= 0) {
        state.folders[index] = action.payload;
      }
    },
    deleteFolder: (state, action) => {
      state.folders = state.folders.filter(
        (folder) => folder.id !== action.payload
      );
    },

    // Logins (Passwords)
    addLogin: (state, action) => {
      state.logins.push(action.payload);
    },
    editLogin: (state, action) => {
      const index = state.logins.findIndex(
        (login) => login.id === action.payload.id
      );
      if (index >= 0) {
        state.logins[index] = action.payload;
      }
    },
    deleteLogin: (state, action) => {
      state.logins = state.logins.filter(
        (login) => login.id !== action.payload
      );
    },
  },
});

export const {
  addNote,
  editNote,
  deleteNote,
  addFolder,
  editFolder,
  deleteFolder,
  addLogin,
  editLogin,
  deleteLogin,
  login,
  logout,
  setInitialData,
} = userSlice.actions;

export default userSlice.reducer;
