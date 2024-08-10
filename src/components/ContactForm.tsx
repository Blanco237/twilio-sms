"use client";

import { useEffect, useRef, useState } from "react";
import { Form, Input, Button, message } from "antd"; // Import Ant Design components
import { addContact } from "@/utils/actions";
import { useRouter } from "next/navigation";
import ContactList from "./ContactList";
import authBlocker from "@/utils/authBlocker";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const router = useRouter();
  const formRef = useRef<any>();

  useEffect(() => {
    authBlocker(router);
  }, [router]);

  const handleSubmit = async () => {
    setLoading(true);
    await addContact({ name, phone: phoneNumber, id: crypto.randomUUID() });
    message.success("Contact added successfully!");
    setName("");
    setPhoneNumber("");
    setLoading(false);
    setTrigger((trig) => !trig);
    formRef.current?.resetFields();
  };

  return (
    <>
      <div className="flex flex-col px-4 pt-20 items-center justify-center min-h-[50vh] bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">Add Contact</h2>
        <Form
          ref={formRef}
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
              type="tel"
              size="large"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter Phone Number"
            />
          </Form.Item>

          <Form.Item className="w-full justify-center flex">
            <Button type="primary" htmlType="submit" loading={loading}>
              Add Contact
            </Button>
          </Form.Item>
        </Form>
      </div>
      <ContactList trigger={trigger} setTrigger={setTrigger} />
    </>
  );
};

export default ContactForm;
