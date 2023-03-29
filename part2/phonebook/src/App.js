import { useState, useEffect } from 'react'
import Phonebook from './components/Phonebook'
import Writer from "./components/Writer"
import Search from "./components/Search"
import Notification from "./components/Notification"

const App = () => {

    const personsState = useState([])
    const [persons, setPersons] = personsState

    const filterState = useState('')
    const [filter,] = filterState

    const [message, setMessage] = useState(null)
    const [style, setStyle] = useState(null)

    const flash = (style, message) => {
        setStyle(style)
        setMessage(
            message
        )
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }

    return (
        <div>
            <h1>Phonebook</h1>
            <Notification className={style} message={message} />
            <Writer peopleState={personsState} flash={flash}/>
            <h2>Numbers</h2>
            <Search filterState={filterState} />
            <Phonebook peopleState={personsState} filter={filter} flash={flash} />
        </div>
    )
}

export default App