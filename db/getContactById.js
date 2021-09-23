const listingContacts = require("./listingContacts");

async function getContactById(contactId) {
  const contacts = await listingContacts();

  const contact = contacts.find(i => i.id.toString() === contactId);
  if (!contact) {
    return null;
  }
  return contact;
}

module.exports = getContactById;
