  
import React, { useState } from 'react'
import { useQuery, useMutation } from "@apollo/client"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"

const Authors = (props) => {
  const [name, setName] = useState("")
  const [born, setBorn] = useState("")

  const result = useQuery(ALL_AUTHORS)
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: ALL_AUTHORS })
      const newData = dataInStore.allAuthors.map(a => {
        return a.id === response.data.editAuthor.id
        ? response.data.editAuthor
        : a
      })
      store.writeQuery({ query: ALL_AUTHORS, data: newData })
    },
    onError: err => {
      console.log(err.graphQLErrors[0].message)
    }
  })

  if (result.loading) {
    return "loading..."
  }

  if (!props.show) {
    return null
  }

  const authors = result.data.allAuthors

  const updateAuthor = async event => {
    event.preventDefault()

    editAuthor({ variables: { name, born: Number(born) } })
  }

  if (!props.user) {
    return (
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                born
              </th>
              <th>
                books
              </th>
            </tr>
            {authors.map(a =>
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>Set birthyear</h3>
      <form onSubmit={updateAuthor}>
        <div>
          name <select value={name} onChange={e => setName(e.target.value)}>
            {authors.map(a => (
              <option key={a.id} value={a.name}>{a.name}</option>
            ))}
          </select>
        </div>
        <div>
          born <input type="number" value={born} onChange={e => setBorn(e.target.value)} />
        </div>
        <button type="submit">update author</button>
      </form>

    </div>
  )
}

export default Authors
