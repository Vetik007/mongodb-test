// міделвара перевірки id на валідність

const { isValidObjectId } = require("mongoose"); // імпортуємо функцію з mongoose

const { HttpError } = require("../helpers");
// console.log(HttpError);

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  //   console.log("req.body" - req.body);
  if (!isValidObjectId(contactId)) {
    next(HttpError(400, `${contactId} is not a valid id`));
  }
  next();
};

module.exports = isValidId;

// В id передаємо щось що може бути id. Функція повертає true або false. Якщо повертається false викидуємо помилку зі статусом 400
