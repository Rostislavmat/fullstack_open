import { useState } from 'react'
import Phonebook from './components/Phonebook'
import Writer from "./components/Writer"
import Search from "./components/Search"

const App = () => {

    const personsState = useState([
        { name: 'Arto Hellas', phone: '040-123456', id: 1 },
        { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
    ])

    const filterState = useState('')
    const [filter,] = filterState

    return (
        <div>
            <h2>Phonebook</h2>
            <Writer peopleState={personsState} />
            <h2>Numbers</h2>
            <Search filterState={filterState} />
            <Phonebook peopleState={personsState} filter={filter}/>
        </div>
    )
}

export default App