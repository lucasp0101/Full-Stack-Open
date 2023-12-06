import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getContactsFromServer = () => {
    return axios
        .get(`${baseUrl}/`)
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

const updateContactOnServer = (contactObject) => {
    console.log('contactObject', contactObject)
    return axios
        .put(`${baseUrl}/${contactObject.id}`, contactObject)
        .then(response => response.data)
}

export default { 
    getContactsFromServer, 
    addContactToServer, 
    deleteContactFromServer, 
    updateContactOnServer
}