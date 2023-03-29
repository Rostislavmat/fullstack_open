import backendService from '../services/backend'
import { useState, useEffect } from 'react'

const CountryEntry = ({ selectCountry, countryName }) => {
    return (
        <li style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ marginRight: '1em' }}>{countryName}</p>
            <button onClick={() => selectCountry(countryName)}>show</button>
        </li>
    );
};

const CountryList = ({ selectedCountry, selectCountry, countries }) => {
    useEffect(() => {
        if (countries.length === 1) {
            requestAnimationFrame(() => selectCountry(countries[0]));
        } else {
            selectCountry(null);
        }
    }, [countries]);

    if (countries.length === 1 || selectedCountry !== null) {
        return null;
    }
    if (countries.length > 10) {
        return (<p> Too many counties: {countries.length}, please filter further. </p>)
    }
    if (countries.length === 0) {
        return (<p> No countries found. </p>)
    }


    console.log("List is ", countries)
    return countries.map(country => <CountryEntry key={country} countryName={country} selectCountry={selectCountry} />)

}

const Search = ({ selectedCountry, selectCountry }) => {

    const [filter, setFilter] = useState('')

    const [countries, setCountries] = useState([])

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    useEffect(() => {
        const pullCountries = async () => {
            console.log("Filter is ", filter)
            const countryList = await backendService.getCountryNames(filter)
            setCountries(countryList)
        }

        pullCountries()
    }, [filter])


    return (
        <div>
            <p> Show countries containing </p>
            <form>
                <input value={filter}
                    onChange={handleFilterChange}
                />
            </form>
            <CountryList countries={countries} selectCountry={selectCountry} selectedCountry={selectedCountry}/>
        </div>
    )
}

export default Search