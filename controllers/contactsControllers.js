const HttpError = require("../helpers/HttpError.js");
const Contact = require("../models/contactsModel.js");

const getAllContacts = async (req, res, next) => {
  const allContacts = await Contact.find();
  res.status(200).json(allContacts);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const contactsById = await Contact.findById(id);
  if (!contactsById) {
    throw HttpError(404);
  }
  res.status(200).json(contactsById);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const removedContact = await Contact.findByIdAndDelete(id);
  if (!removedContact) {
    throw HttpError(404);
  }
  res.status(200).json(removedContact);
};

const createContact = async (req, res) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const changeContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!changeContact) {
    throw HttpError(404);
  }
  res.status(200).json(changeContact);
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  if (favorite === undefined) {
    return res.status(400).json({ message: "missing field favorite" });
  }
  const updateStatusContact = await Contact.findByIdAndUpdate(
    id,
    { $set: { favorite } },
    { new: true }
  );
  if (!updateStatusContact) {
    throw HttpError(404);
  }
  res.status(200).json(updateStatusContact);
};

module.exports = {
  getAllContacts,
  getContactById,
  deleteContact,
  createContact,
  updateContact,
  updateFavorite,
};
