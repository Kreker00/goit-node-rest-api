const express = require("express");
const {
  getAllContacts,
  getOneContactById,
  deleteContact,
  createContact,
  updateContact,
} = require("../controllers/contactsControllers.js");
const validateBody = require("../helpers/validateBody.js");
const {
  createContactSchema,
  updateContactSchema,
} = require("../schemas/contactsSchemas.js");

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContactById);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

contactsRouter.put("/:id", validateBody(updateContactSchema), updateContact);

module.exports = contactsRouter;
