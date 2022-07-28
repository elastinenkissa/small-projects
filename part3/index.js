const express = require("express");
const morgan = require("morgan");
const app = express();

morgan.token("body", (req, res) => JSON.stringify(req.body));

app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  const people = persons.length;
  const currentDate = new Date();
  res.send(
    `<div><p>Phonebook has info for ${people} people</p><p>${currentDate}</p></div>`
  );
});

app.get("/api/persons/:id", (req, res) => {
  const id = +req.params.id;
  const person = persons.find((person) => person.id === id);
  if (!person) {
    return res.status(404).end();
  }
  res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = +req.params.id;
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const newPerson = {
    id: Math.random(),
    name: req.body.name,
    number: req.body.number,
  };
  if (!req.body.name || !req.body.number) {
    return res.status(400).json({
      error: "You must enter a name and a number",
    });
  }

  const alreadyExists = persons.find((person) => person.name === req.body.name);

  if (alreadyExists) {
    return res.status(400).json({
      error: "Name must be unique",
    });
  }

  persons = persons.concat(newPerson);

  res.json(newPerson);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
