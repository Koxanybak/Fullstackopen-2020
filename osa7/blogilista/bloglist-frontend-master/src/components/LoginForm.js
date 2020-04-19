import React, { useState } from "react"
import { TextField, Button } from "@material-ui/core"
import { useDispatch } from "react-redux"
import { createLogin } from "../reducers/loginReducer"

/*const LoginForm = ({ handleLogin, handleUsernameChange, handlePasswordChange, username, password }) => {
  return (
    <form onSubmit={handleLogin} className="loginForm">
      <div>
        username <input id="username" value={username} onChange={handleUsernameChange} />
      </div>
      <div>
        password <input id="password" value={password} type="Password" onChange={handlePasswordChange} />
      </div>
      <div>
        <button type="submit" >login</button>
      </div>
    </form>
  )
}*/

const LoginForm = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()

  const handleLogin = event => {
    event.preventDefault()

    dispatch(createLogin({ username, password }))

    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleLogin} className="loginForm">
      <div>
        <TextField
          id="username"
          label="username"
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div>
        <TextField
          id="password"
          label="password"
          type="password"
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div>
        <Button variant="contained" color="primary" type="submit">
          login
        </Button>
      </div>
    </form>
  )
}

export default LoginForm