import { useState, useEffect } from 'react'
import serverComs from './modules/serverComs'

const Notification = ({ message }) => {
  const notificationStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message === null) {
    return null
  }
  return <div className="notification" style={notificationStyle}> 
      {message}
    </div>
}

const ErrorNotification = ({ message }) => {
  const notificationStyle = {
    color: 'red',
    fontStyle: 'italic',
    fontSize: 16,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message === null) {
    return null
  }
  return <div className="error" style={notificationStyle}>
      {message}
    </div>
}

const Button = ({text, onClick}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

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

const ContactList = ({ contactList, onDeleteHandler }) => {
  return (
    <div>
      {contactList.map(contact => (
        <div key={contact.name}>
          {contact.name}: {contact.number} <Button text="delete" onClick={() => onDeleteHandler(contact.id)}/>
        </div>
        )
      )}
    </div>
  )
}

const App = () => {
  const [contacts, setContacts] = useState([])
  const [notificationMessage, setNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  // Fetch contacts from server
  useEffect(() => {
    serverComs.getContactsFromServer()
      .then(response => {
        setContacts(response)
        setShownContacts(response)
      })
      .catch(error => {
        alert('Error: ' + error)
      })
    },
    []
  )
  
  // New contact form logic
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  
  const onSubmitNewContact = (event) => {
    event.preventDefault()

    // Check both fields are filled out
    if (newName === '' || newNumber === '') {
      alert('Please fill out all fields')
      return
    }

    // Check if contact already exists, if so, ask to update number
    if (contacts.some(contact => contact.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        
        // Copy contact object and update number
        const contactObject = {...contacts.find(contact => contact.name === newName), number: newNumber}

        // Send updated contact to server
        serverComs.updateContactOnServer(contactObject)
          .then(response => {
            // If response code is 200, update contact list
            setContacts(contacts.map(contact => contact.id !== contactObject.id ? contact : contactObject))
            setShownContacts(contacts.map(contact => contact.id !== contactObject.id ? contact : contactObject))
          })
          .catch(error => {
            console.log('error', error)
            setErrorMessage(`Information of ${contactObject.name} has already been removed from server`)
            setTimeout(
              () => setErrorMessage(null),
              2000)
          }
        )
      }

      return
    }

    const contactObject = {
      name: newName,
      number: newNumber,
    }

    // Send new contact to server
    serverComs.addContactToServer(contactObject)
      .then(response => {
        setContacts(contacts.concat(response))
        setShownContacts(contacts.concat(response))

        // Show a notification for 2 seconds
        setNotification('Contact added')
        setTimeout(
          () => setNotification(null),
          2000)
      })
      .catch(error => {
        console.log('error', error)
        setErrorMessage(error.response.data.error)
        setTimeout(
          () => setErrorMessage(null),
          2000)
      }
    )
  }
  
  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  // Delete contact logic
  const handleDeleteContact = (id) => {
    serverComs.deleteContactFromServer(id)
      .then(() => {
        setContacts(contacts.filter(contact => contact.id !== id))
        setShownContacts(contacts.filter(contact => contact.id !== id))

        // Show a notification for 2 seconds
        setNotification('Contact deleted')
        setTimeout(
          () => setNotification(null), 
          2000
        )

      })
      .catch(error => {
        alert('Error: ' + error)
      }
    )
  }
  
  // Search filter logic
  const [shownContacts, setShownContacts] = useState([])

  const handleFilterChange = (event) => {
    const filter = event.target.value
    setShownContacts(contacts.filter(
      contact => contact.name.toLowerCase().includes(filter.toLowerCase())
    ))
  }
  return (
    <div>
    <Notification message={notificationMessage} />
    <ErrorNotification message={errorMessage} />
    <h2>Phonebook</h2>
    <ContactList contactList={shownContacts} onDeleteHandler={handleDeleteContact} />

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