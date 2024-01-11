import { Component } from 'react';
import { nanoid } from 'nanoid';
import MyPhoneForm from './MyPhoneForm/MyPhoneForm';
import MyPhoneList from './MyPhoneList/MyPhoneList';

import styles from './my-phone-book.module.css';

class MyPhoneBook extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  };

  isDublicate({ name, number }) {
    const { contacts } = this.state;
    const normolizedName = name.toLowerCase();

    const dublicate = contacts.find(item => {
      const normalizedCurrentName = item.name.toLowerCase();
      return normalizedCurrentName === normolizedName && number === item.number;
    });
    // console.log(dublicate);
    return Boolean(dublicate);
  }

  addContact = data => {
    // console.log(data);

    if (this.isDublicate(data)) {
      return alert(` ${data.name} is already in contacts`);
    }

    this.setState(({ contacts }) => {
      const newContact = { id: nanoid(), ...data };
      //   return [...contacts, newContact];
      return { contacts: [...contacts, newContact] };
    });
  };

  deleteContact = id => {
    this.setState(({ contacts }) => {
      const newContacts = contacts.filter(item => item.id !== id);

      return { contacts: newContacts };
    });
  };

  changeFilter = ({ target }) => {
    this.setState({ filter: target.value });
  };

  getFilteredContacts() {
    const { filter, contacts } = this.state;
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();

    const filteredContacts = contacts.filter(contacts => {
      const normolizedName = contacts.name.toLowerCase();

      return normolizedName.includes(normalizedFilter);
    });
    return filteredContacts;
  }

  render() {
    // const { contacts } = this.state;
    const { addContact, deleteContact, changeFilter } = this;
    const contacts = this.getFilteredContacts();
    return (
      <div className={styles.wrapper}>
        <MyPhoneForm onSubmit={addContact} />

        <MyPhoneList
          items={contacts}
          deleteContact={deleteContact}
          changeFilter={changeFilter}
        />
      </div>
    );
  }
}
export default MyPhoneBook;
