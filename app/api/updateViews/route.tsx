import { connect2MongoDB } from 'connect2mongodb';
import { NextResponse } from "next/server";
import { cookies } from 'next/headers'
import ViewsModel from '@/src/models/ViewsModel';

export async function GET(request: Request) {

    await connect2MongoDB();

    const cookieStore = cookies()
    const deleteAfter24HoursCookie = cookieStore.get('deleteAfter24Hours')

    if (deleteAfter24HoursCookie !== undefined) {

        const viewsCount = await ViewsModel.findOne({});

        return NextResponse.json(
            {
                viewsCount
            },
            { status: 200 }
        )

    } else if (deleteAfter24HoursCookie === undefined) {

        await connect2MongoDB();

        const viewsCount = await ViewsModel.findOneAndUpdate({}, { $inc: { views: 1 } }, { new: true, upsert: true });

        const oneDay = 24 * 60 * 60 * 1000;
        const expiryDate = new Date(Date.now() + oneDay);
        cookies().set('deleteAfter24Hours', 'I-will-delete-myself-in-24-hours.', { expires: expiryDate });


        return NextResponse.json(
            {
                viewsCount
            },
            { status: 200 }
        )

    }
}