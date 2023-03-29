import { useState } from 'react'
import Search from "./components/Search"
import CountryData from './components/CountryData'

const App = () => {

    const [country, setCountry] = useState(null)

    const showCountry = (newCountry) => {
        console.log("Setting country: ", newCountry)
        setCountry(newCountry)
    }

    return (
        <div>
            <Search selectedCountry={country} selectCountry={showCountry} />
            <CountryData country={country} />
        </div>
    )
}

export default App