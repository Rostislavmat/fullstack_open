
const Entry = ({ name, phone }) => {
    return (<li> {name} {phone} </li>)
}

const Phonebook = ({ peopleState, filter }) => {
    const [people, ] = peopleState
    return (
        <div>
            {people.filter(item => item.name.toLowerCase().includes(filter.toLowerCase())).map(item => <Entry key={item.name} name={item.name} phone={item.phone} />) }
        </div>
    )
}

export default Phonebook