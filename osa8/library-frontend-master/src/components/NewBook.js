import React, { useState } from 'react'
import { useMutation, useSubscription, useApolloClient } from "@apollo/client"
import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS, BOOK_ADDED } from "../queries"

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const client = useApolloClient()

  const [addBook] = useMutation(ADD_BOOK, {
    onError: err => {
      console.log(err.graphQLErrors[0].message)
    },
    /*update: (store, response) => {
      let booksInStore = store.readQuery({
        query: ALL_BOOKS,
        variables: { author: null, genre: null }
      })
      let authorsInStore = store.readQuery({ query: ALL_AUTHORS })
      booksInStore = { allBooks: booksInStore.allBooks.concat(response.data.addBook) }
      authorsInStore = { allAuthors: authorsInStore.allAuthors.concat(response.data.addBook.author) }

      store.writeQuery({ 
        query: ALL_BOOKS,
        variables: { author: null, genre: null },
        data: booksInStore
      })
      store.writeQuery({ 
        query: ALL_AUTHORS,
        data: authorsInStore
      })
    }*/
    //refetchQueries: () => [{ query: ALL_BOOKS, variables: { author: null, genre: null } }, { query: ALL_AUTHORS }]
  })

  const updateCacheWith = response => {
    let booksInStore = client.readQuery({
      query: ALL_BOOKS,
      variables: { author: null, genre: null }
    })

    response.data.bookAdded.genres.forEach(genre => {
      try {
        let filteredInStore = client.readQuery({
          query: ALL_BOOKS,
          variables: { author: null, genre }
        })

        filteredInStore = { allBooks: filteredInStore.allBooks.concat(response.data.bookAdded) }

        client.writeQuery({
          query: ALL_BOOKS,
          variables: { author: null, genre },
          data: filteredInStore
        })
      } catch (e) {
        
      }
    })

    booksInStore = { allBooks: booksInStore.allBooks.concat(response.data.bookAdded) }

    client.writeQuery({ 
      query: ALL_BOOKS,
      variables: { author: null, genre: null },
      data: booksInStore
    })

    let authorsInStore = client.readQuery({ query: ALL_AUTHORS })

    if (!authorsInStore.allAuthors.find(a => a.id === response.data.bookAdded.author.id)) {
      authorsInStore = { allAuthors: authorsInStore.allAuthors.concat(response.data.bookAdded.author) }

      client.writeQuery({ 
        query: ALL_AUTHORS,
        data: authorsInStore
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData: response }) => {
      const addedBook = response.data.bookAdded
      updateCacheWith(response)
      window.alert(`A new book has been added: ${addedBook.title}`)
    }
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    
    addBook({ variables: { title, author, published: Number(published), genres } })

    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook