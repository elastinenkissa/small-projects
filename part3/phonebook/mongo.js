const mongoose = require("mongoose");

const password = process.argv[2];

url = `mongodb+srv://cookerdewitt:${password}@cluster0.z4xvgfr.mongodb.net/phonebook?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

mongoose
  .connect(url)
  .then(() => {
    const input = process.argv;
    const cmdlength = input.length;

    console.log("connected");

    if (cmdlength === 3) {
      Person.find({}).then((res) => {
        res.forEach((person) => {
          console.log(`${person.name} ${person.number}`);
        });
      });
      return mongoose.connection.close();
    }

    const person = new Person({
      name: input[3],
      number: input[4],
    });
    person.save();
  })
  .then(() => {
    console.log("done");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err);
  });
