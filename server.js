if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const indexRouter = require("./routes/index");
const authorRouter = require("./routes/author");
const itemRouter = require("./routes/item");
const userRouter = require("./routes/user");

app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", (error) => console.log("Connected to Mongoose"));

app.use("/", indexRouter);
app.use("/authors", authorRouter);
app.use("/items", itemRouter);
app.use("/users", userRouter);

app.use((err, req, res, next) => {
  console.log("Bad request");
  res.status(404).send({ error: err.message });
});

app.listen(process.env.PORT || 3000);