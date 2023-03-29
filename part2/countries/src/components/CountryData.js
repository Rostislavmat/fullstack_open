import { useState, useEffect } from 'react'
import backendService from '../services/backend'


const WeatherData = ({ city, lat, lon }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await backendService.getWeather(lat, lon);
            console.log(result)
            setData(result);
            
        };

        fetchData();
    }, [lat, lon]);

    if (data === null) {
        return null;
    }

    console.log(data)

    return (
        <div>
        <h2> Weather in {city}</h2>
        <p> Temperature is {data.main.temp} Celcius </p>
            <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="Weather icon" />
        <p> Wind is {data.wind.speed} m/s</p>
        </div>
    )
}

const ActualCountry = ({ country }) => {

    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await backendService.getCountryData(country);
            setData(result[0]);
            console.log(result)
        };

        fetchData();
    }, [country]);

    if (data === null) {
        return null;
    }
    console.log(data.flags.png)
    console.log(data.capitalInfo)
    return (
        <div>
            <h1> {data.name.common} </h1>
            <p> Capital is {data.capital} </p>
            <p> Area is {data.area} km^2 </p>
            <h2> Languages : </h2>
            {Object.values(data.languages).map(lang => <li key={lang}> {lang} </li>)}
            <img src={data.flags.png} alt="Flag" />
            <WeatherData city={data.capital} lat={data.capitalInfo.latlng[0]} lon={ data.capitalInfo.latlng[1]} />
        </div>
    );
}

const CountryData = ({ country }) => {

    if (country === null) {
        return null
    }

    return (
        <ActualCountry country={country} />
    )
}

export default CountryData