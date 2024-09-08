import path from "path";
import { BrowserContext } from "@playwright/test";

const defaultCookies = [
    {
        name: 'SOCS',
        value: 'CAISNQgEEitib3FfaWRlbnRpdHlmcm9udGVuZHVpc2VydmVyXzIwMjQwOTAzLjA0X3AwGgJwbCACGgYIgNLztgY',
        domain: '.google.com',
        path: '/'
    }
]


export async function setDefaultCookies(context: BrowserContext) {
    await context.addCookies(defaultCookies);
} 
