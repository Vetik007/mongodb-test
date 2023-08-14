const mongoose = require("mongoose"); // імпортуємо mongoose
const app = require("./app");
// const DB_HOST = require("./config");

mongoose.set("strictQuery", true);

const { DB_HOST, PORT = 3000 } = process.env;

// console.log(process.env);

// метод connect повертає проміс який треба обробити через then/catch
mongoose
  .connect(DB_HOST) // викликаємо метод connect для підключення до бази даних
  .then(() => {
    // запускаємо сервер. Першим агументом зазначємо порт на якому буде запущений сервер, другим аргуметом передаємо колбек-функцію яка повертає повідомлення що сервер запущений.
    app.listen(PORT, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1); // закриваємо запущені процеси
  });
