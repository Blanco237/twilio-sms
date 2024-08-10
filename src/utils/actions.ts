"use server";

import fs from "fs";
import csvParser from "csv-parser";
import { createObjectCsvStringifier } from "csv-writer";
import path from "path";

import appConstants from "./contants";
import { Contact, Message, service } from "@/types";
import TwilioManager from "./twilio";

let CSV_FILE_PATH;
let MSG_FILE_PATH;
if(process.env.NODE_ENV === 'development'){
  CSV_FILE_PATH = path.join(process.cwd(), "public", "data", "contacts.csv");
  MSG_FILE_PATH = path.join(process.cwd(), "public", "data", "messages.csv");
}else{
  CSV_FILE_PATH = path.join("data", "contacts.csv");
  MSG_FILE_PATH = path.join("data", "messages.csv");
}

export const verifyLogin = async (code: string) => {
  return code === appConstants.AUTH_CODE;
};

export const fetchContacts = async (): Promise<Contact[]> => {
  const contacts: Contact[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(CSV_FILE_PATH)
      .pipe(csvParser())
      .on("data", (data) => {
        contacts.push(data as Contact);
      })
      .on("end", () => {
        resolve(contacts);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};

export const addContact = async (contact: Contact): Promise<boolean> => {
  const csvStringifier = createObjectCsvStringifier({
    header: ["id", "name", "phone"],
  });
  const csvString = csvStringifier.stringifyRecords([contact]);

  fs.appendFileSync(CSV_FILE_PATH, "\n");
  fs.appendFileSync(CSV_FILE_PATH, csvString);

  return Promise.resolve(true);
};

export const deleteContact = async (id: string): Promise<void> => {
  const contacts = await fetchContacts();
  const filteredContacts = contacts.filter((contact) => contact.id !== id);

  const csvStringifier = createObjectCsvStringifier({
    header: ["id", "name", "phone"],
  });
  const csvString = csvStringifier.stringifyRecords(filteredContacts);

  fs.writeFileSync(CSV_FILE_PATH, `id,name,phone\n`);
  fs.appendFileSync(CSV_FILE_PATH, csvString);
};

export const fetchMessages = async (): Promise<Message[]> => {
  const messages: Message[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(MSG_FILE_PATH)
      .pipe(csvParser())
      .on("data", (data) => {
        messages.push(data as Message);
      })
      .on("end", () => {
        resolve(messages.reverse());
      })
      .on("error", (error) => {
        reject(error);
      });
  });
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
