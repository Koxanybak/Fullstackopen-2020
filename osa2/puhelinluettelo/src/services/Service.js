import axios from "axios"

const baseUrl = "http://localhost:3001/persons"

const getAll = () => axios.get(baseUrl).then(response => response.data)

const create = personObject => axios.post(baseUrl, personObject).then(response => response.data)

const deletePerson = personObject =>
  axios.delete(`${baseUrl}/${personObject.id}`).then(response => response.data)

const update = personObject => 
  axios.put(`${baseUrl}/${personObject.id}`, personObject).then(response => response.data)

export default { getAll, create, deletePerson, update }