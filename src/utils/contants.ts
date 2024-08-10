const appConstants = {
  AUTH_CODE: process.env.AUTH_CODE,
  TWILIO_SID: process.env.TWILIO_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_FEDEX_SID: process.env.TWILIO_FEDEX_SID,
  TWILIO_USPS_SID: process.env.TWILIO_USPS_SID,
  TWILIO_DHL_SID: process.env.TWILIO_DHL_SID,
  TWILIO_ROYAL_MAIL_SID: process.env.TWILIO_ROYAL_MAIL_SID,
  TWILIO_MAERS_SID: process.env.TWILIO_MAERS_SID,
  STORAGE_KEYS: {
    AUTH: "authenticated",
  },
};

export default appConstants;
