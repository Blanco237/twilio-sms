"use client";

import { Contact } from "@/types";
import { deleteContact, fetchContacts } from "@/utils/actions";
import { Button, Popconfirm, Table } from "antd";
import { useState, useEffect } from "react";

const ContactList = ({
  trigger,
  setTrigger,
}: {
  trigger: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [contacts, setContacts] = useState<Array<Contact>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const conts = await fetchContacts();
      setContacts(conts);
      setLoading(false);
    };

    load();
  }, [trigger]);

  const handleDelete = async (id: string) => {
    await deleteContact(id);
    setTrigger((trig) => !trig);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Action",
      key: "action",
      render: (record: Contact) => (
        <Popconfirm
          title="Are you sure delete this contact?"
          onConfirm={() => handleDelete(record.id)}
          onCancel={() => {}}
          okText="Yes"
          cancelText="No"
        >
          <Button type="default" danger>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={contacts}
      pagination={false}
      rowKey="id"
      loading={loading}
    />
  );
};

export default ContactList;
