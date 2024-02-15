const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "..", "db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.error("error reading file: ", error.message);
    return [];
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((c) => c.id === contactId);
    return contact || null;
  } catch (error) {
    console.error("error getting contact by id: ", error.message);
    return null;
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const removedContact = contacts.find((c) => c.id === contactId);
    if (!removedContact) {
      return null;
    }
    const updatedContacts = contacts.filter((c) => c.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    return removedContact;
  } catch (error) {
    console.error("Error removing contact:", error.message);
    return null;
  }
}

async function addContact(data) {
  try {
    const newContact = { id: nanoid(), ...data };
    const contacts = await listContacts();
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.error("error adding contact: ", error.message);
    return null;
  }
}

async function updateContactById(contactId, data) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((c) => c.id === contactId);
    if (index === -1) {
      return null;
    }
    const updatedContact = { ...contacts[index], ...data };
    contacts[index] = updatedContact;
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return updatedContact;
  } catch (error) {
    console.error("Error updating contact:", error.message);
    return null;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};
