'use server'

import ViewsModel from "@/models/ViewsModel";
import { connect2MongoDB } from "connect2mongodb";

export async function IncrementViewsAction(increment: boolean) {
    try {

        await connect2MongoDB();

        let viewsCountData;

        if (increment) {
            viewsCountData = await ViewsModel.findOneAndUpdate({}, { $inc: { views: 1 } }, { new: true, upsert: true });
        } else {
            viewsCountData = await ViewsModel.findOne({});
        }

        const viewsCount = viewsCountData.views;

        return { viewsCount, status: 200 };

    } catch (error) {

        console.error("Database operation failed, if possible, please raise a PR to notify me, thanks ♥.");

        return { viewsCount: 0, error: "Database operation failed, if possible, please raise a PR to notify me, thanks ♥.", status: 500 };
    }
}