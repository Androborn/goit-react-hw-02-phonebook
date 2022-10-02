import { Component } from 'react';
import { nanoid } from 'nanoid';

import { ContactForm, Filter, ContactList } from './components';
import { handleInputChange } from './utils';

import { Wrapper, PageHeader, SectionHeader } from './App.styled';

export default class App extends Component {
  constructor() {
    super();
    this.handleFilterInputChange = handleInputChange.bind(this);
  }

  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  // is it fine binding util context this way, or constructor (above) is still better?
  // handleFilterInputChange = handleInputChange.bind(this);

  addContact = (newName, newNumber) => {
    const newContact = {
      id: nanoid(),
      name: newName,
      number: newNumber,
    };
    const { name } = newContact;

    this.checkDuplicatedContacts(name)
      ? alert(`${name} is already in contacts`)
      : this.setState(prevState => ({
          contacts: [...prevState.contacts, newContact],
        }));
  };

  checkDuplicatedContacts = validatedName =>
    this.state.contacts.find(
      contact => contact.name.toLowerCase() === validatedName.toLowerCase(),
    );

  filterContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const {
      state,
      addContact,
      handleFilterInputChange,
      filterContacts,
      deleteContact,
    } = this;

    return (
      <Wrapper>
        <PageHeader>Phonebook</PageHeader>
        <ContactForm onSubmit={addContact} />
        <SectionHeader>Contacts</SectionHeader>
        <Filter value={state.filter} onChange={handleFilterInputChange} />
        <ContactList
          contacts={filterContacts()}
          deleteContact={deleteContact}
        />
      </Wrapper>
    );
  }
}
