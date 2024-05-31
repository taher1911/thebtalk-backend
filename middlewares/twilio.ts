import Twilio from "twilio";
import { SMSVerificationCode } from "../types/SMSVerificationCode";



const sendSMSMessage = async (data : SMSVerificationCode) => {
    const client = Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.AUTH_TOKEN);
    await client.messages.create({
        body:data.text,
        from: process.env.PHONE_NUMBER,
        to: data.phoneNumber,
    });
};

export default sendSMSMessage;