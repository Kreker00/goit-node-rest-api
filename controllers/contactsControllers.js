const HttpError = require("../helpers/HttpError.js");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
} = require("../services/contactsServices.js");

const getAllContacts = async (req, res, next) => {
  const allContacts = await listContacts();
  res.status(200).json(allContacts);
};

const getOneContactById = async (req, res) => {
  const { id } = req.params;
  const contactById = await getContactById(id);
  if (!contactById) {
    throw HttpError(404);
  }
  res.status(200).json(contactById);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const removedContact = await removeContact(id);
  if (!removeContact) {
    throw HttpError(404);
  }
  res.status(200).json(removedContact);
};

const createContact = async (req, res) => {
  const newContact = await addContact(req.body);
  res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  if (!body || Object.keys(body).length === 0) {
    throw HttpError(400, "Body must have at least one field");
  }
  const changeContact = await updateContactById(id, req.body);
  if (!changeContact) {
    throw HttpError(404);
  }
  res.status(200).json(changeContact);
};

module.exports = {
  getAllContacts,
  getOneContactById,
  deleteContact,
  createContact,
  updateContact,
};
