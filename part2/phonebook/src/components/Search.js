const Search = ({ filterState }) => {

    const [filter, setFilter] = filterState

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    return (
        <div>
            <p> Show names starting with </p>
            <form>
                <input value={filter}
                    onChange={handleFilterChange}
                />
            </form>
        </div>
    )
}

export default Search