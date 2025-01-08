import User from './user.model.js';
import Login from './login.model.js';
import Note from './note.model.js';
import Folder from './folder.model.js';

// Define relationships between models
const defineAssociations = () => {
  User.hasMany(Login, { foreignKey: 'user_id', as: 'logins' });
  User.hasMany(Note, { foreignKey: 'user_id', as: 'notes' });
  User.hasMany(Folder, { foreignKey: 'user_id', as: 'folders' });
  Folder.hasMany(Login, { foreignKey: 'user_id', as: 'logins' });
  Folder.hasMany(Note, { foreignKey: 'user_id', as: 'notes' });

  Login.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
  Login.belongsTo(Folder, { foreignKey: 'folder_id', as: 'folder' });
  Note.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
  Note.belongsTo(Folder, { foreignKey: 'folder_id', as: 'folder' });
};

defineAssociations();

export { User, Login, Note, Folder };
