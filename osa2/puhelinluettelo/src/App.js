import React, { useState, useEffect } from "react"
import Persons from "./components/Persons"
import PersonForm from "./components/PersonForm"
import Filter from "./components/Filter"
import Service from "./services/Service"
import "./index.css"

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    Service.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
      setFilter(event.target.value)
  }

  const updateNumber = (person) => {
    Service.update(person)
      .then(updatedPerson => {
        setPersons(persons.map(personObj => personObj.id === updatedPerson.id ? updatedPerson : personObj))
        setNewName('')
        setNewNumber('')
        setErrorMessage(`Updated ${updatedPerson.name}'s phone number`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(`${person.name} has been removed from the server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 8000)
      })
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    let names = persons.map(person => person.name)
    if (names.includes(newName)){
        if (window.confirm(`${newName} has already been added to the phonebook. Do you want to replace the old number with a new one?`)) {
          const oldPerson = persons.find(person => person.name === newName)
          const newPerson = {...oldPerson, number: newNumber}
          updateNumber(newPerson)
        }
        else {
          console.log("Updating cancelled")
        }
        return
    }
    
    Service.create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setErrorMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      .catch(error => {
        console.log(error.response.data.error)
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)){
      Service.deletePerson(person)
        .then(() => {
          setPersons(persons.filter(personObj => personObj.id !== person.id))
          setErrorMessage(`Deleted ${person.name}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
    else {
      console.log("Deletion cancelled")
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h2>add a new</h2>
      <PersonForm newName={newName}
      handleNameChange={handleNameChange}
      newNumber={newNumber} handleNumberChange={handleNumberChange}
      addPerson={addPerson} />
      
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  )
}

const Notification = ({ message }) => {
  return (
    <div className="error">
      {message}
    </div>
  )
}

export default App