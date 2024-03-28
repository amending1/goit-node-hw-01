const { nanoid } = require("nanoid");

// Ta linia kodu importuje moduł fs (File System), który umożliwia interakcję z systemem plików. Moduł ten udostępnia różne metody do czytania, zapisywania, tworzenia i usuwania plików, katalogów itp. Moduł ten jest częścią standardowej biblioteki Node.js
const fs = require("fs");

//Ta linia kodu importuje moduł path, który udostępnia zestaw metod do pracy z ścieżkami plików i katalogów. Dzięki temu modułowi można łatwo budować i manipulować ścieżkami w sposób niezależny od systemu operacyjnego. Moduł path w Node.js dostosowuje się do konwencji używanej w danym systemie operacyjnym i zapewnia spójne i poprawne budowanie ścieżek bez konieczności manualnego sprawdzania, jakiego separatora używać. Dzięki temu, kod napisany z użyciem metod z modułu path jest przenośny i działa w spójny sposób na różnych platformach, co ułatwia tworzenie aplikacji wieloplatformowych.
const path = require("path");

//__dirname jest zmienną globalną w Node.js, która zawiera ścieżkę do katalogu bieżącego pliku
// tworzę zmienną contactsPath, która zawiera pełną ścieżkę do pliku contacts.json. Ścieżka do pliku contacts.json jest tworzona w oparciu o ścieżkę do katalogu bieżącego, dodatkowo dodając elementy db oraz contacts.json.
// const contactsPath = path.join(__dirname, "db", "contacts.json");
const contactsPath = path.join(__dirname, "contacts.json");

//funkcja do wyświettlania listy kontaktów
//Ta część kodu używa metody readFile z modułu fs, aby odczytać zawartość pliku contacts.json
//Parametr contactsPath jest ścieżką do pliku, który chcę odczytać. Drugi parametr 'utf-8' określa kodowanie tekstu pliku. Trzeci parametr to funkcja zwrotna (callback), która zostanie wywołana po zakończeniu odczytu pliku. Funkcja ta przyjmuje dwa argumenty: err - zawiera ewentualny błąd oraz data - zawiera odczytane dane z pliku
function listContacts() {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    //W tym kroku odczytane dane z pliku są przetwarzane. JSON.parse(data) konwertuje odczytane dane, które są w formacie JSON na obiekt JavaScript. Następnie console.table() wyświetla ten obiekt w formie tabeli w konsoli
    console.table(JSON.parse(data));
  });
}

//fs.readFile() służy do odczytu danych z pliku
//fs.writeFile() do zapisu danych do pliku

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const contacts = JSON.parse(data); // Otrzymany obiekt przechowuje listę wszystkich kontaktów

    //Wykorzystuję metodę find() do wyszukania kontaktu o identyfikatorze contactId wśród odczytanych kontaktów. Jeśli kontakt o takim id zostanie znaleziony, zostanie przypisany do zmiennej contact
    const contact = contacts.find((contact) => contact.id === contactId);
    if (contact) {
      console.log("Contact found:");
      console.table(contact);
    } else {
      console.log("Contact not found.");
    }
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const contacts = JSON.parse(data);

    //filtruję listę kontaktów, aby usunąć ten kontakt, którego id pasuje do przekazanego contactId. Metoda filter() zwraca nową tablicę zawierającą tylko te elementy, dla których funkcja zwrotna zwróciła true
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );

    //poniżej funkcja do zapisania zaktualizowanej listy kontaktów do pliku contacts.json. Drugi argument to zaktualizowana lista kontaktów przekonwertowana z powrotem na format JSON 
    fs.writeFile(
      contactsPath,
      JSON.stringify(updatedContacts, null, 2),
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("Contact removed successfully.");
      }
    );
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const contacts = JSON.parse(data);

    //Tworzę nowy obiekt kontaktu
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };

    //Tworzę nową tablicę kontaktów, dodając do niej nowy kontakt
    const updatedContacts = [...contacts, newContact];
    fs.writeFile(
      contactsPath,
      JSON.stringify(updatedContacts, null, 2),
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("Contact added successfully.");
      }
    );
  });
}

//eksportuję funkcje z modułu contacts.js, dzięki czemu będą one dostępne do wykorzystania w innych modułach
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
