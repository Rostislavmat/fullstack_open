import { useState } from 'react'
import backendService from '../services/backend'

const Writer = ({ peopleState, flash }) => {

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

        const existingEntry = people.filter(person => person.name === name)

        if (existingEntry.length !== 0) {
            if (existingEntry[0].phone === number) {
                flash('allBad', `${phoneObject.name} is already present`)
            }
            else {
                if (window.confirm(`Replace number of ${name}?`)) {
                    const id = existingEntry[0].id
                    backendService.update(id, phoneObject)
                        .then(returnedPerson => {
                            setPeople(people.map(person => {
                                return person.id === id ? returnedPerson : person
                            }))
                            flash('allGood', `${phoneObject.name} was edited.`)
                        })
                        .catch(error => {
                            flash('allBad', error.response.data.error)
                        })
                }
                else {
                    return
                }
            }
            
        }
        else {
            backendService.create(phoneObject)
                .then(person => {
                    setPeople(people.concat(person))
                    flash('allGood', `${phoneObject.name} was added.`)
                })
                .catch(error => {
                    flash('allBad', error.response.data.error)
                })
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