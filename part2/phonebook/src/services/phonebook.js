import axios from 'axios'

const baseurl = 'http://localhost:3001/api/persons'

const addNew = person => {
  const request = axios.post(baseurl, person);
  return request.then(response => response.data);
};

const getAll = () => {
  const request = axios.get(baseurl);
  return request.then(response => response.data);
};

const deletePerson = (id) => {
  const request = axios.delete(`${baseurl}/${id}`);
  return request.then(response => response.data);
}

export default { addNew, getAll, deletePerson };