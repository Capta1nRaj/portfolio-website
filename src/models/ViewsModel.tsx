import mongoose from "mongoose";

const ViewsModelSchema = new mongoose.Schema({
    views: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
});

export default mongoose.models.ViewsModel || mongoose.model("ViewsModel", ViewsModelSchema);