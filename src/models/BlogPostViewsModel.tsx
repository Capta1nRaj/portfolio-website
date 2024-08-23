import mongoose from "mongoose";

const BlogPostViewsSchema = new mongoose.Schema({
    blogID: { type: String },
    views: { type: Number }
}, {
    timestamps: true
});

export default mongoose.models.BlogPostViews || mongoose.model("BlogPostViews", BlogPostViewsSchema);