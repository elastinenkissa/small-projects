require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Person = require("./models/person");

const app = express();

app.use(express.json());
app.use(express.static("build"));
morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/api/persons", (req, res) => {
  Person.find({}).then((response) => {
    res.json(response);
  });
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  Person.findById(id).then((response) => {
    res.json(response);
  });
});

app.get("/info", (req, res) => {
  let people = 0;
  Person.find({})
    .then((response) => {
      people = response.length;
    })
    .then(() => {
      const currentDate = new Date();
      res.send(
        `<div><p>Phonebook has info for ${people} people</p><p>${currentDate}</p></div>`
      );
    });
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  Person.findByIdAndRemove(id).then(() => {
    res.status(204).end();
  });
});

app.post("/api/persons", (req, res) => {
  const addingUserName = req.body.name;
  const addingUserNumber = req.body.number;

  Person.find({ name: addingUserName }).then(() => {
    if (!addingUserName || !addingUserName) {
      return res.status(400).json({
        error: "Name or number is missing.",
      });
    }

    const person = new Person({
      name: addingUserName,
      number: addingUserNumber,
    });

    person.save().then((response) => {
      res.json(response);
    });
  });
});

app.put("/api/persons/:id", (req, res) => {
  const newNumber = req.body.number;

  Person.findOneAndUpdate(
    {
      name: req.body.name,
    },
    {
      number: newNumber,
    },
    {
      new: true,
    }
  ).then((response) => {
    res.json(response);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
