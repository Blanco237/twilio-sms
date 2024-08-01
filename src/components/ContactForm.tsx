"use client";

import { useState } from "react";
import { Form, Input, Button, message, Table, Popconfirm } from "antd"; // Import Ant Design components

const ContactForm = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Replace with your actual contact saving logic
    await fetch("/api/contacts", {
      method: "POST",
      body: JSON.stringify({ name, phoneNumber }),
    });
    // Handle success or error
    message.success("Contact added successfully!");
    setName("");
    setPhoneNumber("");
  };

  return (
    <div className="flex flex-col px-4 pt-20 items-center justify-center min-h-[50vh] bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Add Contact</h2>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        autoComplete="off"
        className="w-full max-w-md"
        layout="vertical"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input
            type="text"
            size="large"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
          />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input
            type="text"
            size="large"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter Phone Number"
          />
        </Form.Item>

        <Form.Item className="w-full justify-center flex">
          <Button type="primary" htmlType="submit">
            Add Contact
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ContactForm;
