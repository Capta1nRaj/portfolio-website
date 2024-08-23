import mongoose from "mongoose";

const ViewsSchema = new mongoose.Schema({
    views: { type: Number, required: true, default: 0 }
}, {
    timestamps: true
});

export default mongoose.models.Views || mongoose.model("Views", ViewsSchema);