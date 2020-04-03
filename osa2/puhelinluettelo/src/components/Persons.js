import React from "react"

const Person = ({ person, deletePerson }) => {
    return (
        <div>
            {person.name} {person.number} <button onClick={() => deletePerson(person)}>delete</button>
        </div>
    )
}

const Persons = ({ persons, filter, deletePerson }) => {
    return (
        <div>
          {persons.filter(person => person.name.trim().toLowerCase().includes(filter.trim().toLowerCase()))
            .map(person => {
                return(
                    <Person key={person.id} person={person} deletePerson={deletePerson} />
                )
          })}
      </div>
    )
}

export default Persons