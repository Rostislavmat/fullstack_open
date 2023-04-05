const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')


app.use(cors())
app.use(express.json())
app.use(express.static('build'))

app.use(morgan('dev', {
    skip: function (req, res) { return res.statusCode < 400 }
}))

app.use(morgan('tiny'))


require('dotenv').config()

const Phone = require('./models/phone')

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
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

app.get('/api/persons/:id', (request, response) => {
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

app.delete('/api/persons/:id', (request, response) => {
    Phone.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.get('/info', (req, res) => {
    const bookLen = phones.length
    const timeNow = new Date().toTimeString()
    res.send(`<h1> Phonebook has info for ${bookLen} people </h1> <h2> ${timeNow} </h2>`)
}
)

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

    Phone.findByIdAndUpdate(request.params.id, phone, { new: true })
        .then(updatedPhone => {
            response.json(updatedPhone)
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {

    const body = request.body

    if (!body.name || !body.phone) {
        return response.status(400).json({
            error: 'data missing'
        })
    }

    const phone = new Phone({
        name: body.name,
        phone : body.phone
    })

    phone.save().then(savedPhone => {
        response.json(savedPhone)
    })
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})



/*
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const Note = require('./models/note')

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(express.static('build'))


app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

app.post('/api/notes', (request, response) => {
    const body = request.body

    if (body.content === undefined) {
        return response.status(400).json({ error: 'content missing' })
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
    })

    note.save().then(savedNote => {
        response.json(savedNote)
    })
})

app.get('/api/notes/:id', (request, response, next) => {
    Note.findById(request.params.id)
        .then(note => {
            if (note) {
                response.json(note)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/notes/:id', (request, response, next) => {
    Note.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.put('/api/notes/:id', (request, response, next) => {
    const body = request.body

    const note = {
        content: body.content,
        important: body.important,
    }

    Note.findByIdAndUpdate(request.params.id, note, { new: true })
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next(error))
})

*/