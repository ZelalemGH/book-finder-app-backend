const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const bookRouter = require("./routes/book");
const userRouter = require("./routes/user");
const cors = require("cors");
const favoriteBooksRouter = require("./routes/favoriteBooks");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Your database is successfuly connected to MongoDB !");
  })
  .catch((err) => {
    console.log(err);
  });

/* specifying the middleware function */
app.use(express.json()); // express to use json
app.use(cors({ origin: "*" })); // to make request from different domains
app.use("/api/book", bookRouter); // defining the book router
app.use("/api/user", userRouter); // defining the user router
app.use("/api/favoritebook", favoriteBooksRouter); // defining the favoriteBooks router

/* defining environemt variable which is PORT */
const PORT = process.env.PORT || 3300;

app.listen(PORT, () =>
  console.log(`Backend app is listening at local host ${PORT}`)
);
