import { service } from "@/types";
import appConstants from "./contants";
import twilio, { Twilio } from "twilio";
import { Message } from "@/types";
import { messages } from "@/data/messages";

class TwilioManager {
  client: Twilio;
  services: Record<service, string | undefined> = {
    fedex: appConstants.TWILIO_FEDEX_SID,
    usps: appConstants.TWILIO_USPS_SID,
    dhl: appConstants.TWILIO_DHL_SID,
    royal: appConstants.TWILIO_ROYAL_MAIL_SID,
    maers: appConstants.TWILIO_MAERS_SID,
  };

  constructor() {
    const client = twilio(
      appConstants.TWILIO_SID,
      appConstants.TWILIO_AUTH_TOKEN,
    );
    this.client = client;
  }

  async sendMessage(
    phone: string,
    name: string,
    body: string,
    service: service,
  ) {
    const message = await this.client.messages.create({
      body: body,
      messagingServiceSid: this.services[service],
      to: phone,
    });

    // console.log(message);
    this.addMessage({
      id: message.sid,
      service: service.toUpperCase(),
      receiver: name,
      body: message.body,
      dateCreated: message.dateCreated,
    });
    return message;
  }

  private addMessage(message: any) {
    const newMessage: Message = {
      id: message.id,
      service: message.service,
      receiver: message.receiver,
      body: message.body,
      date: message.dateCreated.toISOString().split("T")[0],
      time: message.dateCreated.toISOString().split("T")[1].slice(0, 5),
    };

    messages.push(newMessage);
  }
}

export default TwilioManager;
