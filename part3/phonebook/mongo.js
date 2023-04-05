const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://rastsislau:${password}@rastsislau.tc1vuj5.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const phoneSchema = new mongoose.Schema({
    name: String,
    phone: String,
})

const Phone = mongoose.model('Phone', phoneSchema)

if (process.argv.length === 3) {
    Phone.find({}).then(result => {
        result.forEach(phone => {
            console.log(phone)
        })
        mongoose.connection.close()
    })
}
else {
    const name = process.argv[3]
    const phoneN = process.argv[4]
    const entry = new Phone({
        name: name,
        phone: phoneN,
    })
    entry.save().then(result => {
        console.log('phone saved!')
        mongoose.connection.close()
    })
}