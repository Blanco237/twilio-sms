'use server';

import appConstants from "./contants";


export const verifyLogin = async (code: string) => {
    return code === appConstants.AUTH_CODE;
}