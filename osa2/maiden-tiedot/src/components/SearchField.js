import React from "react"

const SearchField = ({ handleSearchChange }) => {
  return (
    <input onChange={handleSearchChange} />
  )
}

export default SearchField