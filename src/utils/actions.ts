"use server";

import fs from "fs";
import { Contact, Message, service } from "@/types";
import TwilioManager from "./twilio";
import appConstants from "./contants";
import path from "path";

let CONTACTS_FILE_PATH;
let MESSAGES_FILE_PATH;
if (process.env.NODE_ENV === "development") {
  CONTACTS_FILE_PATH = path.join(process.cwd(), "public", "data", "contacts.json");
  MESSAGES_FILE_PATH = path.join(process.cwd(), "public", "data", "messages.json");
} else {
  CONTACTS_FILE_PATH = path.join(process.cwd(), "data", "contacts.json");
  MESSAGES_FILE_PATH = path.join(process.cwd(), "data", "messages.json");
}

export const verifyLogin = async (code: string) => {
  return code === appConstants.AUTH_CODE;
};

export const fetchContacts = async (): Promise<Contact[]> => {
  try {
    const data = fs.readFileSync(CONTACTS_FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading contacts file:", error);
    return [];
  }
};

export const addContact = async (contact: Contact): Promise<boolean> => {
  try {
    const contacts = await fetchContacts();
    contacts.push(contact);
    fs.writeFileSync(CONTACTS_FILE_PATH, JSON.stringify(contacts, null, 2));
    return true;
  } catch (error) {
    console.error("Error adding contact:", error);
    return false;
  }
};

export const deleteContact = async (id: string): Promise<void> => {
  try {
    const contacts = await fetchContacts();
    const filteredContacts = contacts.filter((contact) => contact.id !== id);
    fs.writeFileSync(CONTACTS_FILE_PATH, JSON.stringify(filteredContacts, null, 2));
  } catch (error) {
    console.error("Error deleting contact:", error);
  }
};

export const fetchMessages = async (): Promise<Message[]> => {
  try {
    const data = fs.readFileSync(MESSAGES_FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading messages file:", error);
    return [];
  }
};

export const sendMessage = async (
  phone: string,
  name: string,
  body: string,
  service: service
) => {
  const twilio = new TwilioManager();
  const msg = await twilio.sendMessage(phone, name, body, service);
  if (msg.sid) {
    return true;
  }
  return false;
};
