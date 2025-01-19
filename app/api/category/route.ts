import { NextRequest, NextResponse } from "next/server";

import dbConnect from "@/lib/mongodb";

import Category from "@/models/api/category";


export const GET = async (request: NextRequest) => {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    try {
        if (id) {
            const category = await Category.findById(id);
            if (!category) {
                return NextResponse.json({ message: 'Category not found' }, { status: 404 });
            }
            return NextResponse.json(category, { status: 200 });
        }
        const categories = await Category.find();
        return NextResponse.json(categories, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error happened ' }, { status: 500 });
    }
}

export const PUT = async (request: NextRequest) => {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const { name } = await request.json();
    if (!id) {
        return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
    }
    try {
        const category = await Category.findByIdAndUpdate(id, { name });
        if (!category) {
            return NextResponse.json({ message: 'Category not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Category updated successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error happened ' }, { status: 500 });
    }

}
export const POST = async (request: NextRequest) => {
    await dbConnect();
    const { name } = await request.json();
    try {
        const category = await Category.create({ name });
        return NextResponse.json({ message: 'Category created successfully', category }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: 'Error happened ' }, { status: 500 });
    }
}

export const DELETE = async (request: NextRequest) => {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    try {
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return NextResponse.json({ message: 'Category not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Category deleted successfully', category }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error happened ' }, { status: 500 });
    }
}