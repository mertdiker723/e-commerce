import { NextResponse } from "next/server";
import data from "@/data.json";

// https://www.youtube.com/watch?v=kO2nTCgcJLc&list=PLC3y8-rFHvwjOKd6gdf4QtV1uYNiQnruI&index=11

export const GET = async (req: Request, { params }: { params: { userId: string } }) => {

    const user = data.filter(item => params.userId === item.id.toString());

    return NextResponse.json({
        user
    })

}