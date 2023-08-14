const { Schema, model } = require("mongoose"); // імпортуємо з mongoose дві функції Schema і model
const { handleMongooseError } = require("../helpers");

// створюємо схему mongoose
// Якщо до поля більше однієї вимоги створюємо об'єкт в якому перераховуємо всі вимоги до поля.
// другим елементом у схемі передаємо об'єкт налаштування (параметр versionKey - виводить версію документа, параметр timestamps - виводить дату створення та дату оновлення запису.)
const contactSchema = new Schema(
  {
    name: {
      type: String, // тип поля
      required: [true, "Set name for contact"], // вказуємо обов'язкове поле чи ні
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false, // значення за замовчуванням
    },
  },
  { versionKey: false, timestamps: true }
);

// додаємо до схеми міделвару обробки невірного статутсу помилок
contactSchema.post("save", handleMongooseError);
// contactSchema.put("save", handleMongooseError);

// створюємо модель. В аргументах назву колекціїї передаємо в однині
const Contact = model("contact", contactSchema);

module.exports = Contact;
