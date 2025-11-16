import { NextRequest, NextResponse } from 'next/server';
import BlogPostViewsModel from "@/models/BlogPostViewsModel";
import { connect2MongoDB } from "connect2mongodb";

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
    try {
        await connect2MongoDB();

        const { blogIds } = await request.json();

        if (!Array.isArray(blogIds)) {
            return NextResponse.json(
                { success: false, error: 'blogIds must be an array' },
                { status: 400 }
            );
        }

        // Fetch all blog views in a single query
        const viewsData = await BlogPostViewsModel.find({
            blogID: { $in: blogIds }
        }).select('blogID views -_id');

        // Create a map for quick lookup
        const viewsMap: { [key: string]: number } = {};
        viewsData.forEach(item => {
            viewsMap[item.blogID] = item.views;
        });

        // Ensure all requested blog IDs have a view count (default to 0 if not found)
        const result: { [key: string]: number } = {};
        blogIds.forEach(blogId => {
            result[blogId] = viewsMap[blogId] || 0;
        });

        return NextResponse.json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error('Error fetching blog views:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch blog views',
                data: {}
            },
            { status: 500 }
        );
    }
}
