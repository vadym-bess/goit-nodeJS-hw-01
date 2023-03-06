const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve("db/contacts.json");

async function getContacts() {
  try {
    const contactsJSON = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(contactsJSON);
    return contacts;
  } catch (error) {
    console.log(error);
  }
}

// ---------------------------------------------

const listContacts = async () => {
  try {
    const contacts = await getContacts();
    const contactList = contacts.map((item) => {
      return {
        ID: item.id,
        NAME: item.name,
        EMAIL: item.email,
        PHONE: item.phone,
      };
    });
    console.table(contactList);
  } catch (err) {
    console.log(err.message);
  }
};

// ----------------------------------------------

const getContactById = async (contactId) => {
  try {
    const contacts = await getContacts();

    const contact = contacts.filter(
      (item) => String(item.id) === String(contactId)
    );
    console.table(contact);
  } catch (err) {
    console.log(err.message);
  }
};

// ----------------------------------------------

const removeContact = async (contactId) => {
  try {
    let contacts = await getContacts();

    contacts = contacts.filter((item) => String(item.id) !== String(contactId));

    await fs.writeFile("db/contacts.json", JSON.stringify(contacts));

    console.table(`Contact with id ${contactId} has been removed`);
  } catch (err) {
    console.error(err);
  }
};
// -----------------------------------------------

const addContact = async (name, email, phone) => {
  const contacts = await getContacts();
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  try {
    await fs.writeFile("db/contacts.json", JSON.stringify(contacts));
    console.log("New contact added:", newContact);
  } catch (err) {
    console.error(err.message);
  }
};

// -------------------------------------------------

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
