require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const morgan = require('morgan')
const Person = require('./models/person')
const { response } = require('express')

morgan.token('body', req => JSON.stringify(req.body))

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)
app.use(express.static('build'))
app.use(express.json())
app.use(cors())

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

  newPerson.save().then(personAdded => {
    res.json(personAdded)
  })
})

app.put('/api/persons/:id', (req, res, next) => {
  body = req.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

const unknownEndPoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndPoint)

const errorHandler = (error, req, res, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})
