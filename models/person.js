const mongoose = require('mongoose')
const process = require('process')

const url = process.env.MONGO_URI

mongoose
  .connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => console.log('error connecting to MongoD:', error.message))

const personSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
    unique: true,
  },
  number: {
    type: String,
    validate: {
      validator: value => {
        const re = /^(\d{2})-(\d{7,})$|^(\d{3})-(\d{7,})$/g

        return value.match(re)
      },
      message: props => `${props.value} is not a valid number`,
    },
    required: [true, 'Number is required'],
    minLength: 8,
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Person = mongoose.model('Persons', personSchema)

module.exports = Person
