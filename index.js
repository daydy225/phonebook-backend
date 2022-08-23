require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const morgan = require('morgan')
const Person = require('./models/person')

morgan.token('body', req => JSON.stringify(req.body))

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)
app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h3>hello world</h3>')
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

app.get('/info', (req, res) => {
  Person.find({}).then(persons => {
    const info = {
      entries: persons.length,
      date: new Date(),
    }
    res.send(`
    <div>
    <p>Phonebook has info for ${info.entries} people</p>
    <p>${info.date.toGMTString()}</p>
    </div>
    `)
  })
})

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id).then(person => {
    res.json(person)
  })
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons.filter(person => person.id !== id)
  res.status(204).end()
})

app.post('/api/persons/', (req, res) => {
  const body = req.body

  if (body.name === undefined || body.number === undefined) {
    return res.status(400).json({
      error: 'The name or number is missing',
    })
  }

  const newPerson = new Person({
    name: body.name,
    number: body.number,
  })

  newPerson.save().then(personCreated => {
    res.json(personCreated)
  })
})

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})
