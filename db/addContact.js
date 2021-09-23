const {nanoid}=require('nanoid')

const listingContacts = require("./listingContacts");
const updateContacts = require("./updateContacts");

async function addContact(name, email, phone) {
  const contacts = await listingContacts();
  const newContact = {name, email, phone, id: nanoid(5) };
  contacts.push(newContact);
  await updateContacts(contacts)
  
  return "Success add";
}

module.exports = addContact;
