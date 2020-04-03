import React, { useState, useEffect } from "react"
import axios from "axios"

const CountryList = ({ countries, handleShow }) => {
  return (
    <div>
      {countries.map(country => 
        <Country key={country.name} country={country} handleShow={handleShow}/>
      )}
    </div>
  )
}

const Country = ({ country, handleShow }) => {
  return (
    <div>{country.name} <ShowButton handleShow={handleShow} name={country.name} /></div>
  )
}

const ElaborateCountry = ({ country }) => {
  const [weatherObject, setWeatherObject] = useState({})

  useEffect(() => {
    console.log("subeffect")
    axios
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`)
      .then(response => {
        console.log("subpromise fulfilled")
        //console.log
        setWeatherObject(response.data)
      })
  }, [])
  console.log("weatherObject temp:", weatherObject.hasOwnProperty("current") ? weatherObject.current.temperature : "ei ole")
  
  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt="flag" width="200"/>
      <h3>Weather in {country.capital}</h3>
      <p>
        <strong>temperature: </strong>
        {weatherObject.hasOwnProperty("current")
          ? `${weatherObject.current.temperature} Celcius`
          : "loading"}
      </p>
      <div>
        {weatherObject.hasOwnProperty("current")
          ? <img src={weatherObject.current.weather_icons[0]} alt="Weather" />
          : "loading"}
      </div>
      <p>
        <strong>wind: </strong>
        {weatherObject.hasOwnProperty("current")
          ? `${weatherObject.current.wind_speed} km/h direction ${weatherObject.current.wind_dir}`
          : "loading"}
      </p>
    </div>
  )
}

const ShowButton = ({ handleShow, name }) => 
  <button onClick={() => handleShow(name)}>show</button>


const Content = ({ countries, handleShow }) => {
  if (countries.length > 10){
    return (<div>too many matches, specify another filter</div>)
  }
  else if (countries.length === 1){
    return (
      <ElaborateCountry country={countries[0]} />
    )
  }
  else if (countries.length > 1){
    return (
      <CountryList countries={countries} handleShow={handleShow} />
    )
  }
  else{
    return null
  }
}

export default Content