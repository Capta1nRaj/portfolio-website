'use server'

import ContactModel from "@/models/ContactModel";
import { connect2MongoDB } from "connect2mongodb";

export default async function ContactAction(formData: any) {
    try {
        await connect2MongoDB();
        await new ContactModel(formData).save();
        return { status: true };
    } catch (error) {
        console.error('Error processing contact form submission:', error);
        return { status: false };
    }
}