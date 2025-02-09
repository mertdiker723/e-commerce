import { NextRequest, NextResponse } from "next/server";

// Models
import User from "@/models/api/register";

// Core
import dbConnect from "@/lib/mongodb";

export const POST = async (request: NextRequest) => {
    await dbConnect();
    const { name, surname, email, password } = await request.json();
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: 'Email already in use' }, { status: 400 });
        }
        const user = await User.create({ name, surname, email, password });
        return NextResponse.json({ message: 'User created successfully', user }, { status: 201 })

    } catch (error) {
        return NextResponse.json({ message: 'Error happened ' }, { status: 500 });
    }
}