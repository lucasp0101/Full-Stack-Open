const PORT = 3001;

const express = require('express');
const app = express();

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

let contacts = [
    { 
        name: "Arto Hellas", 
        number: "040-123456",
        id: 1
    },
    { 
        name: "Ada Lovelace", 
        number: "39-44-5323523",
        id: 2
    },
    { 
        name: "Dan Abramov", 
        number: "12-43-234345",
        id: 3
    },
    { 
        name: "Mary Poppendieck", 
        number: "39-23-6423122",
        id: 4
    }
]

app.get('/api/persons', (request, response) => {
    response.json(contacts)
}) 

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const contact = contacts.find(contact => contact.id === id)
    if (contact) {
        response.json(contact)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    contacts = contacts.filter(contact => contact.id !== id)

    response.status(204).end()
})

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${contacts.length} people</p>
    <p>${new Date()}</p>`)
})