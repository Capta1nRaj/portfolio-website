'use server'

import ContactModel from "@/models/ContactModel";
import { FetchUserIP } from "@/utils/FetchUserIP";
import { connect2MongoDB } from "connect2mongodb";
import axios from 'axios';

export default async function ContactAction(formData: any) {
    try {
        await connect2MongoDB();
        // Fetch  user their location via IP address
        const ipData = await axios.get(`http://ip-api.com/json/${await FetchUserIP()}`);
        // User IP response
        const { data: { country, regionName, city, zip, timezone } } = ipData;

        const dataToSave = {
            ...formData,
            country: country ? country : "",
            regionName: regionName ? regionName : "",
            city: city ? city : "",
            zip: zip ? zip : "",
            timezone: timezone ? timezone : ""
        }

        await new ContactModel(dataToSave).save();
        return { status: true };
    } catch (error) {
        console.error('Error processing contact form submission:', error);
        return { status: false };
    }
}