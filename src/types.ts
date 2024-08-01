export interface Contact {
    id: string;
    name: string;
    phone: string;
}

export interface Message {
    id: string;
    receiver: string;
    body: string
    date: string
    time: string
}