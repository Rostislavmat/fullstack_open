import { useState } from 'react'

const Writer = ({ peopleState }) => {

    const [people, setPeople] = peopleState

    const name_defult = "Name"
    const number_default = "Number"

    const [name, setName] = useState(name_defult)
    const [number, setNumber] = useState(number_default)

    const handleNameChange = (event) => {
        setName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNumber(event.target.value)
    }

    const addName = (event) => {
        event.preventDefault()
        if (name.length === 0 || name === name_defult) {
            alert("Valid name is required")
            return
        }
        if (number.length === 0 || number === number_default) {
            alert("Valid phone is required")
            return
        }
        const phoneObject = {
            name: name,
            phone: number,
        }

        if (people.filter(person => person.name === name).length !== 0) {
            alert(`${name} is already added to phonebook`)
        }
        else {
            setPeople(people.concat(phoneObject))
        }
        setName(name_defult)
        setNumber(number_default)
    }

    return (
        <div>
        <form onSubmit={addName}>
            <input value={name}
                    onChange={handleNameChange}
                />
             <input value={number}
                    onChange={handleNumberChange}
                />
             <button type="submit">save</button>
            </form>
        </div>
    )
}

export default Writer