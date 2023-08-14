// const contacts = require("../models/contacts"); // імпорт функції для роботи з contacts.json
const Contact = require("../models/contact"); // імпорт функції для роботи з бекендом

const { HttpError, ctrlWrapper } = require("../helpers"); // імпортуємо функцію генерації та виводу помилки

// отритмання всіх контактів
// метод find знаходить і повертає всі елементи колекціі
const getListContacts = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

// отримання контакту по id
// метод findOne - знаходить перше співпадіння і повертає об'єкт, інакше - null
const getContactById = async (req, res) => {
  const { contactId } = req.params;

  // const result = await Contact.findOne({ _id: contactId }); // використовують для пошуку всього іншого
  const result = await Contact.findById(contactId); // використовують для пошуку по id

  // обробляємо помилку якщо контакт не існує
  if (!result) {
    throw HttpError(404, "Contact not found");
  }
  res.json(result);
};

// додавання контакту
// для додавання необхідно прочитати тіло запиту, яке зберігається у req.body
// робимо валідацію за домогою бібліотеки joi. У addSchema викликаємо метод validate та передаємо об'єкт який необхідно перевірити, тобто перевіряємо тіло body(об'єкт post-запиту на додавання контакту) на наявність всіх полів та їх відповідність вимогам у addSchema
const addContacts = async (req, res, next) => {
  const result = await Contact.create(req.body);

  res.status(201).json(result);
};

// видалення контакту
const removeContacts = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "Сontact deleted" });
};

// внесення змін до контакту
const updateContact = async (req, res) => {
  const { contactId } = req.params;
  console.log("contactIdUpdate", contactId);
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  console.log(result);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  // console.log("contactIdFavorite", contactId);

  const { favorite } = req.body;
  // console.log(favorite);

  if (favorite === undefined) {
    throw HttpError(400, "missing field favorite");
  }

  const result = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );
  
  // console.log(result);
  if (!result) {
    throw HttpError(404, `Contact with id= ${id} not found`);
  }
  res.json(result);
};

module.exports = {
  getListContacts: ctrlWrapper(getListContacts),
  getContactById: ctrlWrapper(getContactById),
  addContacts: ctrlWrapper(addContacts),
  removeContacts: ctrlWrapper(removeContacts),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};

//* ================== код для роботи з локальним json-файлом =========================
// // отритмання всіх контактів
// const getListContacts = async (req, res) => {
//   const result = await contacts.listContacts();
//   res.json(result);
// };

// // отримання контакту по id
// const getContactById = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await contacts.getContactById(contactId);
//   // обробляємо помилку якщо контакт не існує
//   if (!result) {
//     throw HttpError(404, "Contact not found");
//   }
//   res.json(result);
// };

// // додавання контакту
// // для додавання необхідно прочитати тіло запиту, яке зберігається у req.body
// // робимо валідацію за домогою бібліотеки joi. У addSchema викликаємо метод validate та передаємо об'єкт який необхідно перевірити, тобто перевіряємо тіло body(об'єкт post-запиту на додавання контакту) на наявність всіх полів та їх відповідність вимогам у addSchema
// const addContacts = async (req, res, next) => {
//   const result = await contacts.addContact(req.body);
//   res.status(201).json(result);
// };

// // видалення контакту
// const removeContacts = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await contacts.removeContact(contactId);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json({ message: "Сontact deleted" });
// };

// // внесення змін до контакту
// const updateContact = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await contacts.updateContact(contactId, req.body);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json(result);
// };

// module.exports = {
// getListContacts: ctrlWrapper(getListContacts),
// getContactById: ctrlWrapper(getContactById),
// addContacts: ctrlWrapper(addContacts),
// removeContacts: ctrlWrapper(removeContacts),
// updateContact: ctrlWrapper(updateContact),
// };
