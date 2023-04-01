const express = require('express')
const app = express()
var morgan = require('morgan')

app.use(express.json())

app.use(morgan('dev', {
    skip: function (req, res) { return res.statusCode < 400 }
}))

app.use(morgan('tiny'))

let phones = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(phones)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const phone = phones.find(phone => phone.id === id)

    if (phone) {
        response.json(phone)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    phones = phones.filter(phone => phone.id !== id)

    response.status(204).end()
})

app.get('/info', (req, res) => {
    const bookLen = phones.length
    const timeNow = new Date().toTimeString()
    res.send(`<h1> Phonebook has info for ${bookLen} people </h1> <h2> ${timeNow} </h2>`)
}
)

const generateId = () => {
    return Math.floor(Math.random() * 1e7)
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.phone) {
        return response.status(400).json({
            error: 'data missing'
        })
    }

    if (phones.filter(phone => phone.name === body.name).length > 0) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const phone = {
        name: body.name,
        phone: body.phone,
        id: generateId(),
    }

    phones = phones.concat(phone)

    response.json(note)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
