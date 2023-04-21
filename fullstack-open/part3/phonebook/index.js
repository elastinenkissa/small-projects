require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const Person = require("./models/person");

const app = express();

app.use(express.json());
app.use(express.static("build"));
morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "TypeError") {
    return response.status(404).json({ error: "The user does not exist." });
  }
};

app.get("/api/persons", (req, res) => {
  Person.find({}).then((response) => {
    res.json(response);
  });
});

app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findById(id)
    .then((response) => {
      if (response) {
        res.json(response);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
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

app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findByIdAndRemove(id)
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => {
      next(error);
    });
});

app.post("/api/persons", (req, res, next) => {
  const addingUserName = req.body.name;
  const addingUserNumber = req.body.number;

  const person = new Person({
    name: addingUserName,
    number: addingUserNumber,
  });

  person
    .save()
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      next(error);
    });
});

app.put("/api/persons/:id", (req, res, next) => {
  const newNumber = req.body.number;
  const userId = req.body.id;

  Person.findOneAndUpdate(
    {
      _id: userId,
    },
    {
      number: newNumber,
    },
    {
      new: true,
      runValidators: true,
      context: "query",
    }
  )
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      next(error);
    });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
