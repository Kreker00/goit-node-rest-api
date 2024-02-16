const express = require("express");
const {
  getAllContacts,
  getContactById,
  deleteContact,
  createContact,
  updateContact,
  updateFavorite,
} = require("../controllers/contactsControllers.js");
const validateBody = require("../helpers/validateBody.js");
const {
  createContactSchema,
  updateContactSchema,
  favoriteSchema,
} = require("../schemas/contactsSchemas.js");
const isValidId = require("../middlewares/isValidId.js");

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", isValidId, getContactById);

contactsRouter.delete("/:id", isValidId, deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

contactsRouter.put(
  "/:id",
  validateBody(updateContactSchema),
  isValidId,
  updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  validateBody(favoriteSchema),
  isValidId,
  updateFavorite
);

module.exports = contactsRouter;
