const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as arument: node mongo.js <password>'
  )
  process.exit(1)
}

const password = process.argv[2]

url = `mongodb+srv://daydydev:${password}@cluster0.omubslw.mongodb.net/phonebook?retryWrites=true&w=majority`

const personSchema = mongoose.Schema({
  name: String,
  number: String,
})
const Person = mongoose.model('Persons', personSchema)

mongoose.connect(url).then(() => {
  console.log('connected')
  if (process.argv.length > 3) {
    const newName = process.argv[3]
    const newNumber = process.argv[4]

    const person = new Person({
      name: newName,
      number: newNumber,
    })

    person
      .save()
      .then(savedPerson => {
        console.log(`added ${newName} ${newNumber} to phonebook`)
        return mongoose.connection.close()
      })
      .catch(error => console.log(error))
  }

  if (process.argv.length === 3) {
    Person.find({})
      .then(persons => {
        console.log('phonebook:')
        persons.forEach(person => {
          console.log(`${person.name} ${person.number}`)
        })
        return mongoose.connection.close()
      })
      .catch(error => console.log(error))
  }
})
