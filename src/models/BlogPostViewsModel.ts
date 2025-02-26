import mongoose from "mongoose";

const BlogPostViewsSchema = new mongoose.Schema({
    blogID: { type: String, required: true },
    views: { type: Number, default: 0 }
}, { timestamps: true });

BlogPostViewsSchema.index({ blogID: 1 });

export default mongoose.models.BlogPostViews || mongoose.model("BlogPostViews", BlogPostViewsSchema);