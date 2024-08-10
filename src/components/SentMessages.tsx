"use client";

import { useState, useEffect } from "react";
import { Table, Modal, Button, message } from "antd";
import { Message } from "@/types";
import { fetchMessages } from "@/utils/actions";
import { useRouter } from "next/navigation";
import authBlocker from "@/utils/authBlocker";

const SentMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    authBlocker(router);
  }, [router]);

  useEffect(() => {
    const fetchMessagesData = async () => {
      setLoading(true);
      try {
        const fetchedMessages = await fetchMessages();
        setMessages(fetchedMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
        message.error("Failed to load messages");
      }
      setLoading(false);
    };

    fetchMessagesData();
  }, []);

  const handleRowClick = (message: Message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "Receiver",
      dataIndex: "receiver",
      key: "receiver",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
  ];

  return (
    <div className="flex flex-col px-4 pt-20 items-center justify-center min-h-screen bg-gray-100 w-full">
      <h2 className="text-2xl font-bold mb-4">Sent Messages</h2>
      <Table
        columns={columns}
        dataSource={messages}
        pagination={false}
        style={{ width: "100%" }}
        rowKey="id"
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        loading={loading}
      />

      <Modal
        title="Message Details"
        open={isModalOpen}
        onCancel={handleModalCancel}
        footer={[
          <Button key="back" onClick={handleModalCancel}>
            Close
          </Button>,
        ]}
      >
        {selectedMessage && (
          <div>
            <p>
              <strong>Receiver:</strong> {selectedMessage.receiver}
            </p>
            <p>
              <strong>Service:</strong> {selectedMessage.service}
            </p>
            <p>
              <strong>Date:</strong> {selectedMessage.date}
            </p>
            <p>
              <strong>Time:</strong> {selectedMessage.time}
            </p>
            <p>
              <strong>Body:</strong> {selectedMessage.body}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SentMessages;
