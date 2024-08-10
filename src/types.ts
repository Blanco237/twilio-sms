export interface Contact {
  id: string;
  name: string;
  phone: string;
}

export interface Message {
  id: string;
  service: string;
  receiver: string;
  body: string;
  date: string;
  time: string;
}

export type service = "fedex" | "usps" | "dhl" | "royal" | "maers";
