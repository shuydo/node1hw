const { Command } = require("commander");

const contactsOperations = require("./db");

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      return await contactsOperations
        .listingContacts()
        .then(data => console.table(data))
        .catch(e => console.log(e));

    case "get":
      return await contactsOperations
        .getContactById(id)
        .then(data => console.log(data))
        .catch(e => console.log(e));

    case "add":
      await contactsOperations
        .addContact(name, email, phone)
        .then(data => console.log(data))
        .catch(e => console.log(e));
      return await contactsOperations
        .listingContacts()
        .then(data => console.table(data))
        .catch(e => console.log(e));

    case "remove":
      await contactsOperations.removeContact(id)
      .then(data => console.log(data))
      .catch(e => console.log(e));
      return await contactsOperations
        .listingContacts()
        .then(data => console.table(data))
        .catch(e => console.log(e));

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
