import { NextResponse } from "next/server";

export const GET = async () => {
    return NextResponse.json({
        test: "asd"
    })
}

export const POST = async (request: Request) => {
    const data = await request.json();
    return NextResponse.json({
        data
    })
}