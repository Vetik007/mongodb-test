const mongoose = require("mongoose"); // імпортуємо mongoose
const app = require("./app");
// const DB_HOST = require("./config");

mongoose.set("strictQuery", true);
const { DB_HOST } = process.env;

// console.log(process.env);

// const DB_HOST =
//   "mongodb+srv://Vitalii:9L4E74zNJp6pvZKP@cluster0.qttkxlb.mongodb.net/db-contacts?retryWrites=true&w=majority"; // строка підключення до бази яку беремо з MongoDB

// const DB_HOST = process.env;

// метод connect повертає проміс який треба обробити через then/catch
mongoose
  .connect(DB_HOST) // викликаємо метод connect для підключення до бази даних
  .then(() => {
    // запускаємо сервер. Першим агументом зазначємо порт на якому буде запущений сервер, другим аргуметом передаємо колбек-функцію яка повертає повідомлення що сервер запущений.
    app.listen(3000, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1); // закриваємо запущені процеси
  });
