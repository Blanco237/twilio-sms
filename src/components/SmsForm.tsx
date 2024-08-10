"use client";

import { Contact, service } from "@/types";
import { fetchContacts, sendMessage } from "@/utils/actions";
import authBlocker from "@/utils/authBlocker";
import { Select, Form, Input, Button, message } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
// import { sendSMS } from '@/utils/actions';

const { Option } = Select;

const services = [
  {
    label: "FEDEX",
    value: "fedex",
  },
  {
    label: "USPS",
    value: "usps",
  },
  {
    label: "DHL",
    value: "dhl",
  },
  {
    label: "ROYAL MAIL",
    value: "royal",
  },
  {
    label: "MAERS",
    value: "maers",
  },
];

const SmsForm = () => {
  const [selectedContact, setSelectedContact] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState<Array<Contact>>([]);
  const [contactsLoading, setContactsLoading] = useState(true);
  const [service, setService] = useState<service | null>(null);
  const router = useRouter();
  const formRef = useRef<any>();
  const form = Form.useForm();

  useEffect(() => {
    authBlocker(router);
  }, [router]);

  useEffect(() => {
    const load = async () => {
      const conts = await fetchContacts();
      setContacts(conts);
      setContactsLoading(false);
    };

    load();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const contact = contacts.find((cn) => cn.id === selectedContact)!;
      const response = await sendMessage(
        contact.phone,
        contact.name,
        messageContent,
        service!,
      );
      if (response) {
        message.success("SMS sent successfully!");
        setSelectedContact("");
        setMessageContent("");
        setService(null);
        formRef.current?.resetFields();
      } else {
        message.error("Failed to send SMS");
      }
    } catch (error) {
      message.error("Failed to send SMS");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col px-4 pt-20 items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Send SMS</h2>
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
          label="Select Contact"
          name="selectedContact"
          rules={[{ required: true, message: "Please select a contact!" }]}
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
              return (option?.children as string)
                .toLowerCase()
                .includes(search.toLowerCase());
            }}
          >
            {contacts?.map((contact) => {
              return (
                <Option key={contact.id} value={contact.id}>
                  {contact.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item
          label="Select Brand"
          name="service"
          rules={[{ required: true, message: "Please select a contact!" }]}
        >
          <Select
            size="large"
            value={service}
            onChange={setService}
            placeholder="Select Service"
          >
            {services.map((service) => {
              return (
                <Option key={service.value} value={service.value}>
                  {service.label}
                </Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item
          label="Message"
          name="messageContent"
          rules={[{ required: true, message: "Please enter a message!" }]}
        >
          <Input.TextArea
            style={{ minHeight: "150px" }}
            size="large"
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            placeholder="Enter Message"
          />
        </Form.Item>

        <Form.Item className="w-full justify-center flex">
          <Button type="primary" htmlType="submit" loading={loading}>
            Send SMS
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SmsForm;
