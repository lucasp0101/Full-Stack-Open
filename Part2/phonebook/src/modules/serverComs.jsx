import axios from 'axios'
const baseUrl = 'http://localhost:3001/contacts'

const getContactsFromServer = () => {
    return axios
        .get(baseUrl)
        .then(response => response.data)
}

const addContactToServer = (contactObject) => {
    return axios
        .post(baseUrl, contactObject)
        .then(response => response.data)
}

const deleteContactFromServer = (id) => {
    return axios
        .delete(`${baseUrl}/${id}`)
        .then(response => response.data)
}

export default { getContactsFromServer, addContactToServer, deleteContactFromServer}