import React, { useState, useEffect } from "react"
import { LOGIN } from "../queries"
import { useMutation } from "@apollo/client"

const LoginForm = ({ setToken, show }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [login, result] = useMutation(LOGIN, {
    onError: (err => {
      console.log(err.message)
    })
  })

  useEffect(() => {
    if (result.data) {
      setToken(result.data.login.value)
      localStorage.setItem("loggedLibraryUser", result.data.login.value)
    }
  }, [result.data]) //eslint-disable-line

  const handleLogin = e => {
    e.preventDefault()

    login({ variables: { password, username } })

    setPassword("")
  }

  if (!show) {
    return null
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username <input value={username} onChange={e => setUsername(e.target.value)} />
      </div>
      <div>
        password <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <div>
        <button type="submit">login</button>
      </div>
    </form>
  )
}

export default LoginForm