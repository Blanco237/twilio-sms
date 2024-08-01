'use server';

import fs from 'fs';
import csvParser from 'csv-parser';
import { createObjectCsvStringifier } from 'csv-writer';
import path from 'path';

import appConstants from "./contants";
import { Contact } from '@/types';

const CSV_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'contacts.csv');

export const verifyLogin = async (code: string) => {
    return code === appConstants.AUTH_CODE;
}

export const fetchContacts = async (): Promise<Contact[]> => {
    const contacts: Contact[] = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(CSV_FILE_PATH)
            .pipe(csvParser())
            .on('data', (data) => {
                contacts.push(data as Contact);
            })
            .on('end', () => {
                resolve(contacts);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
};

export const addContact = async (contact: Contact): Promise<boolean> => {
    const csvStringifier = createObjectCsvStringifier({ header: ['id', 'name', 'phone', ] });
    const csvString = csvStringifier.stringifyRecords([contact]);

    fs.appendFileSync(CSV_FILE_PATH, '\n');
    fs.appendFileSync(CSV_FILE_PATH, csvString);

    return Promise.resolve(true);
};

export const deleteContact = async (id: string): Promise<void> => {
    const contacts = await fetchContacts();
    const filteredContacts = contacts.filter((contact) => contact.id !== id);

    const csvStringifier = createObjectCsvStringifier({ header: [ 'id', 'name', 'phone'] });
    const csvString = csvStringifier.stringifyRecords(filteredContacts);

    fs.writeFileSync(CSV_FILE_PATH, `id,name,phone\n`);
    fs.appendFileSync(CSV_FILE_PATH, csvString);
};