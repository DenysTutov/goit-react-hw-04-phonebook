import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ContactForm } from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import style from '../components/App.module.scss';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(window.localStorage.getItem('contacts')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
    );
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddNewContact = newContact => {
    setContacts(prevState => [...prevState, newContact]);
  };

  const handleChangeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const getFilteredContacts = () => {
    const normalizeFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizeFilter)
    );
  };

  const handleDeleteContact = contactId => {
    setContacts(prevState => prevState.filter(({ id }) => id !== contactId));
  };

  const contactsName = contacts.map(contact => contact.name);

  return (
    <div>
      <h1 className={style.title}>Phonebook</h1>
      <ContactForm onSubmit={handleAddNewContact} contactsName={contactsName} />

      <h2 className={style.title}>Contacts</h2>
      <div className={style.contact_list_container}>
        <Filter value={filter} onChange={handleChangeFilter} />
        <ContactList
          visibleContacts={getFilteredContacts()}
          onDeleteContact={handleDeleteContact}
        />
      </div>
      <ToastContainer />
    </div>
  );
};
