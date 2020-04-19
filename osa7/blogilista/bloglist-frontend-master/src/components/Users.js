import React from "react"
import { Link } from "react-router-dom"
import {
  Table,
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
  Paper,
} from "@material-ui/core"

const Users = ({ users }) => {

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          <TableRow key="1">
            <TableCell>
              
            </TableCell>
            <TableCell>
              <h4>blogs created</h4>
            </TableCell>
          </TableRow>
          {users.map(user => (
            <User key={user.id} user={user} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const User = ({ user }) => {
  return (
    <TableRow key={user.id}>
      <TableCell>
        <Link to={`/users/${user.id}`}>{user.name}</Link>
      </TableCell>
      <TableCell>
        {user.blogs.length}
      </TableCell>
    </TableRow>
  )
}

export const ExtendedUser = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h4>added blogs</h4>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>
            {blog.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Users