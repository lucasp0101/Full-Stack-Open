import { useState, useEffect } from 'react'
import axios from 'axios'


const Input = ({ namee, onChange }) => {
  return (
    <input name={namee} onChange={onChange} />
  )
}

const Form = ({ onSubmit, children }) => {
  return (
    <form onSubmit={onSubmit}>
        {children.map(child => (
          <div key={child.name}>
            {child.name}: <br />
            <Input namee={child.name} onChange={child.onChange} />
          </div>
        ))}
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}

const ContactList = ({ contactList }) => {
  console.log('contacts', contactList)
  return (
    <div>
      {contactList.map(contact => (
        <div key={contact.name}>
          {contact.name}: {contact.number}
        </div>
        )
      )}
    </div>
  )
}

const App = () => {
  const [contacts, setContacts] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 

  // Fetch contacts from server
  useEffect(() => {
    axios
      .get('http://localhost:3001/contacts')
      .then(response => {
        console.log('response', response)
        setContacts(response.data)
        setShownContacts(response.data)
        }
      )
    },
    [])
  
  // New contact form logic
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  
  const onSubmitNewContact = (event) => {
    event.preventDefault()
    const contactObject = {
      name: newName,
      number: newNumber,
    }
    setContacts(contacts.concat(contactObject))
    console.log('contacts', contacts)
    setNewName('')
    setNewNumber('')
  }
  
  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  // Search filter logic
  const [shownContacts, setShownContacts] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const handleFilterChange = (event) => {
    const filter = event.target.value
    console.log('filter', filter)
    setShownContacts(contacts.filter(
      contact => contact.name.toLowerCase().includes(filter.toLowerCase())
    ))
  }
    
  return (
    <div>
    <h2>Phonebook</h2>
    <ContactList contactList={shownContacts} />

    <h2>Filter contacts</h2>
    <input onChange={handleFilterChange} />

    <h2>Add a new contact</h2>

    {Form({ onSubmit: onSubmitNewContact, 
      children: [
        { name: 'name', onChange: handlePersonChange }, 
        { name: 'number', onChange: handleNumberChange }] 
    })}
  </div>
  )
}

export default App