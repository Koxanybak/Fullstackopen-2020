import React, { useState, useEffect } from 'react'
import { useLazyQuery, useQuery } from "@apollo/client"
import { ALL_BOOKS, ME } from "../queries"

const Books = (props) => {
  const [filter, setFilter] = useState(null)
  const [initialBooks, setInitialBooks] = useState([])

  const [allBooks, result] = useLazyQuery(ALL_BOOKS)
  const user = useQuery(ME)

  useEffect(() => {
    if (props.recommend) {
      allBooks({ variables: { author: null, genre: user.data.me.favoriteGenre } })
    } else {
      allBooks({ variables: { author: null, genre: filter } })
    }
  }, [filter, user, props.recommend]) //eslint-disable-line

  useEffect(() => {
    if (!filter && result.data) {
      setInitialBooks(result.data.allBooks)
    }
  }, [result.data]) //eslint-disable-line

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return "loading..."
  }

  const books = result.data.allBooks

  const genres = []
  initialBooks.forEach(b => {
    b.genres.forEach(g => {
      if (!genres.includes(g)) {
        genres.push(g)
      }
    })
  })

  return (
    <div>
      <h2>books</h2>

      <h4>showing books that match the genre: {!props.recommend ?
      (filter ? `"${filter}"` : "\"all genres\"") : "your favourite genre"}
      </h4>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books
            /*.filter(b => {
              if (filter === null) {
                return true
              }
              return b.genres.includes(filter)
            })*/
            .map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {!props.recommend ? <div>
        {genres.map(g => (
          <button key={g} onClick={() => setFilter(g)}>{g}</button>
        ))}
        <button onClick={() => setFilter(null)}>all genres</button>
      </div> : null}
    </div>
  )
}

export default Books