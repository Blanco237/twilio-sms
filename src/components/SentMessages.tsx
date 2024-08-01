import { Message } from '@/types';
import { useState, useEffect } from 'react';

const SentMessages = () => {
  const [messages, setMessages] = useState<Array<Message>>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await fetch('/api/messages');
      const data = await response.json();
      setMessages(data);
    };
    fetchMessages();
  }, []);

  return (
    <ul>
      {messages.map((message) => (
        <li key={message.id}>
          To: {message.receiver} - Body: {message.body}
        </li>
      ))}
    </ul>
  );
};

export default SentMessages;
