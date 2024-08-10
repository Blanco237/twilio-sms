"use server";

import { Contact, Message, service } from "@/types";
import TwilioManager from "./twilio";
import appConstants from "./contants";
import { contacts } from "@/data/contacts";
import { messages } from "@/data/messages";

export const verifyLogin = async (code: string) => {
  return code === appConstants.AUTH_CODE;
};

export const fetchContacts = async (): Promise<Contact[]> => {
  const list = contacts;
  return list;
};

export const addContact = async (contact: Contact): Promise<boolean> => {
  contacts.push(contact);
  return true;
};

export const deleteContact = async (id: string): Promise<void> => {
  try {
    const filtered = contacts.filter((contact) => contact.id !== id);
    contacts.length = 0;
    contacts.push(...filtered);
  } catch (error) {
    console.error("Error deleting contact:", error);
  }
};

export const fetchMessages = async (): Promise<Message[]> => {
  const list = messages;
  return list;
};

export const sendMessage = async (
  phone: string,
  name: string,
  body: string,
  service: service,
) => {
  const twilio = new TwilioManager();
  const msg = await twilio.sendMessage(phone, name, body, service);
  if (msg.sid) {
    return true;
  }
  return false;
};
