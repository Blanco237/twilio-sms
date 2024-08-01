import { Contact } from '@/types';
import { useState, useEffect } from 'react';

const ContactList = () => {
  const [contacts, setContacts] = useState<Array<Contact>>([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const response = await fetch('/api/contacts');
      const data = await response.json();
      setContacts(data);
    };
    fetchContacts();
  }, []);

  return (
    <ul>
      {contacts.map((contact) => (
        <li key={contact.id}>
          {contact.name} - {contact.phone}
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
