import { InquiryDetailsLisStatusOptions } from "@/utils/ENUMS";
import mongoose from "mongoose";

const ContactModel = new mongoose.Schema({
    fullName: { type: String, required: true },
    contactNumber: { type: String, required: true },
    companyName: { type: String, required: false },
    email: { type: String, required: true },
    message: { type: String, required: false },
    status: { type: String, required: true, enum: InquiryDetailsLisStatusOptions, default: "new" }
}, { timestamps: true });

export default mongoose.models.Contact || mongoose.model("Contact", ContactModel);