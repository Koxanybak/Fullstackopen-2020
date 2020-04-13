import React from "react"

const LoginForm = ({ handleLogin, handleUsernameChange, handlePasswordChange, username, password }) => {
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
}

export default LoginForm