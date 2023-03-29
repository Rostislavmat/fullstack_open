import { useEffect } from 'react'
import backendService from '../services/backend'

const Entry = ({ peopleState, person, flash }) => {

    const [persons, setPersons] = peopleState

    const deletePerson = () => {
        if (window.confirm(`Delete person ${person.name}?`)) {
            backendService.remove(person.id).then(response => {
                flash('allGood', `Deleted person ${person.name}`)
            }).catch(error => {
                flash('allBad', `Person ${person.name} is deleted from server already.`)
            }).finally(setPersons(persons.filter(new_person => new_person.id !== person.id)))

        }
    }

    return (
        <>
        <li> {person.name} {person.phone} </li>
            <button onClick={deletePerson}>Delete</button>
        </>
    )
}

const Phonebook = ({ peopleState, filter, flash }) => {
    const [persons,setPersons] = peopleState

    useEffect(() => {
        backendService.getAll().then(persons => setPersons(persons))
    }, [setPersons])

    return (
        <div>
            {persons.filter(item => item.name.toLowerCase().includes(filter.toLowerCase())).map(item => <Entry key={item.name} peopleState={peopleState} person={item} flash={flash} />) }
        </div>
    )
}

export default Phonebook