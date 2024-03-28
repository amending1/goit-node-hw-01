// Plik index.js zawiera logikę obsługi poleceń z linii poleceń, która wykorzystuje funkcje z pliku contacts.js do manipulacji danymi kontaktowymi przechowywanymi w pliku contacts.json


//importuję moduł za pomocą require
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./db/contacts.js");

const { Command } = require("commander");

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

//process.argv zawiera tablicę argumentów wiersza poleceń, gdzie process.argv[0] to ścieżka do node, process.argv[1] to ścieżka do pliku, a następne elementy to przekazane argumenty
//program.parse() analizuje te argumenty zgodnie z zdefiniowanymi opcjami, żeby ustawić wartości opcji
program.parse(process.argv);

//Ta linia kodu pobiera ustawione opcje z analizy argumentów wiersza poleceń i przypisuje je do zmiennej argv
const argv = program.opts();

//funkcja, która otrzymuje obiekt zawierający opcje z argumentów wiersza poleceń (odczytane przez program.parse()), takie jak action, id, name, email, phone
function invokeAction({ action, id, name, email, phone }) {
  //Ta konstrukcja switch wybiera odpowiednią akcję do wykonania na podstawie wartości action, która została przekazana jako argument wiersza poleceń
  switch (action) {
    case "list":
      listContacts();
      break;

    case "get":
      getContactById(id);
      break;

    case "add":
      addContact(name, email, phone);
      break;

    case "remove":
      removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
