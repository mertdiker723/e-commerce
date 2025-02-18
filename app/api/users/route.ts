import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

import dbConnect from "@/lib/mongodb";
import User from "@/models/api/register";



export const GET = async (req: NextRequest) => {
    await dbConnect();
    const { value } = req.cookies.get('token') || {};

    if (value) {
        try {
            const decoded = jwt.verify(value, process.env.NEXT_PUBLIC_JWT_SECRET as string) as { userId: string, email: string, password: string, iat: number, exp: number };
            const {_id, email, name} = await User.findOne({ email: decoded.email });
            return NextResponse.json({ user: { userId: _id, email, name }}, { status: 200 });
        } catch (error) {
            return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
        }
    } else {
        return NextResponse.json({ message: 'No token found' }, { status: 401 });
    }

}
