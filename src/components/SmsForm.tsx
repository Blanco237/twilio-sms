'use client';

import { Contact } from "@/types";
import { fetchContacts } from "@/utils/actions";
import authBlocker from "@/utils/authBlocker";
import { Select, Form, Input, Button, message } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import { sendSMS } from '@/utils/actions';

const { Option } = Select;

const SmsForm = () => {
  const [selectedContact, setSelectedContact] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState<Array<Contact>>([]);
  const [contactsLoading, setContactsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    authBlocker(router);
  }, [])

  useEffect(() => {
    const load = async () => {
      const conts = await fetchContacts();
      setContacts(conts)
      setContactsLoading(false)
    }

    load();
  }, [])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      // await sendSMS(selectedContact, messageContent);
      // Handle success or error
      message.success('SMS sent successfully!');
      setSelectedContact('');
      setMessageContent('');
    } catch (error) {
      message.error('Failed to send SMS');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col px-4 pt-20 items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Send SMS</h2>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        autoComplete="off"
        className="w-full max-w-md"
        layout="vertical"
      >
        <Form.Item
          label="Select Contact"
          name="selectedContact"
          rules={[{ required: true, message: 'Please select a contact!' }]}
          
        >
          <Select
            size="large"
            value={selectedContact}
            onChange={setSelectedContact}
            placeholder="Select Contact"
            showSearch
            loading={contactsLoading}
            filterOption={(search, option) => {
               // @ts-ignore
              return (option?.children as string).toLowerCase().includes(search.toLowerCase())
            }}
          >
            {
              contacts.map((contact) => {
                return <Option key={contact.id} value={contact.phone}>{contact.name}</Option>
              })
            }
          </Select>
        </Form.Item>

        <Form.Item
          label="Message"
          name="messageContent"

          rules={[{ required: true, message: 'Please enter a message!' }]}
        >
          <Input.TextArea
            style={{minHeight: '150px'}}
            size="large"
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            placeholder="Enter Message"
          />
        </Form.Item>

        <Form.Item className='w-full justify-center flex'>
          <Button type="primary" htmlType="submit" loading={loading}>
            Send SMS
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SmsForm;
