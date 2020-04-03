import React, { useState, useEffect } from 'react'
import SearchField from "./components/SearchField"
import Content from "./components/Content"
import axios from "axios"

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  //const [selCountries, setSelCountries] = useState([])

  useEffect(() => {
    console.log("effect")
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        console.log("promise fulfilled")
        setCountries(response.data)
        //console.log(countries.map(country => country.name))
      })
  }, [])

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
    /*setSelCountries(countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase())))
    console.log(selCountries)*/
  }
  
  const handleShow = (value) => {
    setSearch(value)
  }

  //console.log("selCountries", selCountries.length)

  return (
    <div>
      <div>
        find countries <SearchField handleSearchChange={handleSearchChange} />
      </div>
      <div>
        <Content handleShow={handleShow} countries={countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()))} />
      </div>
    </div>
  )
}

export default App