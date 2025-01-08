import { User, Folder } from '../../db/models';
export const getAllFolders = async (req, res, next) => {
  try {
    const folders = await Folder.findAll({
      include: ['notes', 'logins', 'user'],
    });
    return res.json(folders);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

export const getFolderByUuid = async (req, res, next) => {
  const uuid = req.params.uuid;
  try {
    const folder = await Folder.findOne({
      where: { uuid },
      include: ['notes', 'logins', 'user'],
    });
    return res.json(folder);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const updateFolder = async (req, res, next) => {
  const uuid = req.params.uuid;
  try {
    const folder = await Folder.findOne({
      where: { uuid },
      include: ['notes', 'logins', 'user'],
    });
    folder.name = req.body.name;
    folder.description = req.body.description;

    await note.save();
    return res.json(folder);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const deleteFolder = async (req, res, next) => {
  const uuid = req.params.uuid;
  try {
    const folder = await Folder.findOne({ where: { uuid } });
    await folder.destroy();
    return res.json({ msg: 'Successfully delete a folder' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const createFolder = async (req, res, next) => {
  const { userUuid } = req.body;
  try {
    const user = await User.findOne({ where: { uuid: userUuid } });
    const folder = await Folder.create({ ...req.body, user_id: user.id });
    return res.json(folder);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
