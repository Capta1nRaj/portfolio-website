import { connect2MongoDB } from 'connect2mongodb';
import { NextResponse } from "next/server";
import ViewsModel from '@/src/models/ViewsModel';

export async function POST(request: Request) {

    try {

        await connect2MongoDB();

        const { increment } = await request.json();

        let viewsCount;

        if (increment) {
            viewsCount = await ViewsModel.findOneAndUpdate({}, { $inc: { views: 1 } }, { new: true, upsert: true });
        } else {
            viewsCount = await ViewsModel.findOne({});
        }

        return NextResponse.json(
            {
                viewsCount
            },
            { status: 200 }
        );

    } catch (error) {

        console.error("Database operation failed, if possible, please raise a PR to notify me, thanks ♥.");

        return NextResponse.json(
            {
                error: "Database operation failed, if possible, please raise a PR to notify me, thanks ♥."
            },
            { status: 500 }
        );
    }

}