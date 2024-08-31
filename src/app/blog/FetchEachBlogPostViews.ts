'use server'

import BlogPostViewsModel from "@/models/BlogPostViewsModel";
import { connect2MongoDB } from "connect2mongodb";

export async function FetchEachBlogPostViews(blogID: string) {
    try {
        await connect2MongoDB();

        let postViewsData = await BlogPostViewsModel.findOne({ blogID }).select('-_id views');
        if (!postViewsData) { postViewsData = await new BlogPostViewsModel({ blogID, views: 0 }).save(); }

        const { views: postViews } = postViewsData;

        return { postViews, status: 200 };
    } catch (error) {

        console.error("Database operation failed, in FetchEachBlogPostViews if possible, please raise a PR to notify me, thanks ♥.");

        return { error: "Database operation failed, in FetchEachBlogPostViews if possible, please raise a PR to notify me, thanks ♥.", status: 500 };
    }
}