import { NextResponse } from "next/server";

export const GET = async () => {
    const response = NextResponse.json({ message: "Logged out successfully" }, { status: 200 });

    response.cookies.set("token", "", {
        httpOnly: true,
        secure: true,
        path: "/",
        expires: new Date(0),
    });

    return response;
};