import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import User from "@/models/api/register";
import dbConnect from "@/lib/mongodb";
import { tokenCreation } from "@/lib/token";

export const POST = async (req: NextRequest) => {
    await dbConnect();
    const { email, password } = await req.json();

    try {
        const findedUser = await User.findOne({ email });
        if (!findedUser) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        const isPasswordValid = await bcrypt.compare(password, findedUser.password);
        if (!isPasswordValid) {
            return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
        }
        const token = tokenCreation(findedUser._id, findedUser.email, password);
        const response = NextResponse.json({ message: 'User authenticated successfully' }, { status: 200 });
        response.cookies.set('token', token, { httpOnly: true, secure: true, path: '/' });
        return response;
    } catch (error) {
        return NextResponse.json({ message: 'Error happened' }, { status: 500 });
    }
}