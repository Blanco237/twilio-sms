import { useState } from 'react';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Replace with your actual contact saving logic
    await fetch('/api/contacts', {
      method: 'POST',
      body: JSON.stringify({ name, phoneNumber }),
    });
    // Handle success or error
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Name"
      />
      <input
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Enter Phone Number"
      />
      <button type="submit">Add Contact</button>
    </form>
  );
};

export default ContactForm;
