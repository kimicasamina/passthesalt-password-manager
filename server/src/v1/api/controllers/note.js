import { User, Note } from "../../db/models";
export const getAllNotes = async (req, res, next) => {
  try {
    const notes = await Note.findAll({
      include: ["user"],
    });
    return res.json({ notes });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export const getNoteByUuid = async (req, res, next) => {
  const uuid = req.params.uuid;
  try {
    const note = await Note.findOne({ where: { uuid }, include: ["user"] });
    return res.json(note);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const updateNote = async (req, res, next) => {
  const uuid = req.params.uuid;
  try {
    const note = await Note.findOne({ where: { uuid }, include: ["user"] });
    note.name = req.body.name;
    note.content = req.body.email;

    await note.save();
    return res.json(note);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const deleteNote = async (req, res, next) => {
  const uuid = req.params.uuid;
  try {
    const note = await Note.findOne({ where: { uuid } });
    await note.destroy();
    return res.json({ msg: "Successfully delete a note" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const createNote = async (req, res, next) => {
  const { userUuid } = req.body;
  try {
    const user = await User.findOne({ where: { uuid: userUuid } });
    const note = await Note.create({ ...req.body, user_id: user.id });
    return res.json(note);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
