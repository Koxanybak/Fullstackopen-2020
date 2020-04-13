import React from "react"

const LoginForm = ({ handleLogin, handleUsernameChange, handlePasswordChange, username, password }) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        username <input value={username} onChange={handleUsernameChange} />
      </div>
      <div>
        password <input value={password} type="Password" onChange={handlePasswordChange} />
      </div>
      <div>
        <button type="submit" >login</button>
      </div>
    </form>
  )
}

export default LoginForm