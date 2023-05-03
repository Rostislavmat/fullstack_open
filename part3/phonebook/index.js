const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

app.use(morgan(function (tokens, req, res) {
  const initial = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ]
  if (req.method === 'POST') {
    initial.push(JSON.stringify(req.body))
  }
  return initial.join(' ')
}))

require('dotenv').config()

const Phone = require('./models/phone')

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/api/persons', (req, res) => {
  Phone.find({}).then(notes => {
    res.json(notes)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Phone.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Phone.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.get('/info', async (req, res) => {
  const count = await Phone.countDocuments({})
  const timeNow = new Date().toTimeString()
  res.send(`<h1> Phonebook has info for ${count} people </h1> <h2> ${timeNow} </h2>`)
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.phone) {
    return response.status(400).json({
      error: 'data missing'
    })
  }

  const phone = {
    name: body.name,
    phone: body.phone
  }

  Phone.findByIdAndUpdate(request.params.id, phone, { new: true, runValidators: true, context: 'query' })
    .then(updatedPhone => {
      response.json(updatedPhone)
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.phone) {
    return response.status(400).json({
      error: 'data missing'
    })
  }

  const phone = new Phone({
    name: body.name,
    phone: body.phone
  })

  phone.save().then(savedPhone => {
    response.json(savedPhone)
  }).catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
