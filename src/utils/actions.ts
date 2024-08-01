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