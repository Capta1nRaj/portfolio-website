import { NextRequest, NextResponse } from 'next/server';
import { GetHomepagePost } from '@/server/GetHomepagePost';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const start = parseInt(searchParams.get('start') || '0');
        const limit = parseInt(searchParams.get('limit') || '6');

        const posts = await GetHomepagePost(start, limit);

        return NextResponse.json({
            success: true,
            data: posts,
            count: posts.length
        });
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch blog posts',
                data: []
            },
            { status: 500 }
        );
    }
}
