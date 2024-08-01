'use client';

import { Contact } from '@/types';
import { fetchContacts } from '@/utils/actions';
import { Button, Popconfirm, Table } from 'antd';
import { useState, useEffect } from 'react';

const ContactList = () => {
  const [contacts, setContacts] = useState<Array<Contact>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const conts = await fetchContacts();
      setContacts(conts)
      setLoading(false);
    }

    load();
  }, []);

  const handleDelete = async (id: string) => {
    await fetch(`/api/contacts/${id}`, {
      method: 'DELETE',
    });
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: Contact) => (
        <Popconfirm
          title="Are you sure delete this contact?"
          onConfirm={() => handleDelete(record.id)}
          onCancel={() => {}}
          okText="Yes"
          cancelText="No"
        >
          <Button type="default" danger >Delete</Button>
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
