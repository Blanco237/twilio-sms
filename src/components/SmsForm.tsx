'use client';

import { Select, Form, Input, Button, message } from "antd";
import { useState } from "react";
// import { sendSMS } from '@/utils/actions';

const { Option } = Select;

const SmsForm = () => {
  const [selectedContact, setSelectedContact] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [loading, setLoading] = useState(false);

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
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
            value={selectedContact}
            onChange={setSelectedContact}
            placeholder="Select Contact"
            showSearch
          >
            {/* Populate with your contact data */}
            <Option value="+1234567890">John Doe</Option>
            {/* ... more options */}
          </Select>
        </Form.Item>

        <Form.Item
          label="Message"
          name="messageContent"

          rules={[{ required: true, message: 'Please enter a message!' }]}
        >
          <Input.TextArea
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
