'use server'

import BlogPostViewsModel from "@/models/BlogPostViewsModel";
import { connect2MongoDB } from "connect2mongodb";

export async function IncrementArticleViewsAction(blogID: string) {
    try {

        await connect2MongoDB();

        await BlogPostViewsModel.updateOne({ blogID }, { $inc: { views: 1 } }, { upsert: true });

        return { status: 200 };

    } catch (error) {

        console.error("Database operation failed, in IncrementArticleViewsAction, if possible, please raise a PR to notify me, thanks ♥.");

        return { error: "Database operation failed, in IncrementArticleViewsAction, if possible, please raise a PR to notify me, thanks ♥.", status: 500 };
    }
}