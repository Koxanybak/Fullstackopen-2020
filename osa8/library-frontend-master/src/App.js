
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from "./components/LoginForm"
import { useApolloClient } from "@apollo/client"

const App = () => {
  const client = useApolloClient()
  const initialToken = localStorage.getItem("loggedLibraryUser")

  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(initialToken)

  const logout = () => {
    localStorage.removeItem("loggedLibraryUser")
    setToken(null)
    client.resetStore()
  }

  if (!token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>
  
        <Authors
          show={page === 'authors'}
          user={token}
        />
  
        <Books
          show={page === 'books'}
        />
  
        <LoginForm
          setToken={setToken}
          show={page === 'login'}
        />
  
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')}>recommend</button>
        <button onClick={logout}>logout</button>
      </div>

      <Authors
        show={page === 'authors'}
        user={token}
      />

      <Books
        show={page === 'books' || page === "recommend"}
        recommend={page === "recommend"}
        user={token}
      />

      <NewBook
        show={page === 'add'}
      />

    </div>
  )
}

export default App