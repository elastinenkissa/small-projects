const mongoose = require('mongoose')

const url = process.env.MONGODB_URL

mongoose
  .connect(url)
  .then(() => {
    console.log('Connected to database')
  })
  .catch((err) => {
    console.log(`Error connecting to the databse: ${err.message}`)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{3}-\d/.test(v) || /^\d{2}-\d/.test(v)
      },
      message: 'Enter a valid phone number',
    },
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
