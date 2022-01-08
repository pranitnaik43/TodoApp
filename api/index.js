const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Mongo
const mongo = require("./mongo");

const todoService = require("./todo.services");

const app = express();
const PORT = (process.env.PORT) ? (process.env.PORT) : 3001;

(async function load() {
  try {
    await mongo.connect();

    app.use(express.json());    //body params -> json

    app.use(cors());
    
    app.get("/check",(req, res) => res.send({"message": "running"}));
    app.get("/api/todos", todoService.find);

    app.listen(PORT, () =>
      console.log(`Server running at port ${PORT}`)
    );
  } catch (err) {
    console.log(err);
  }
})(); //imediately invoked function

