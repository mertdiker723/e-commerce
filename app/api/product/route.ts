import { NextRequest, NextResponse } from "next/server";

import dbConnect from "@/lib/mongodb";
import Product from "@/models/api/product";


export const GET = async (req: NextRequest) => {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    try {
        if (id) {
            const product = await Product.findById(id);
            if (!product) {
                return NextResponse.json({ message: 'Product not found' }, { status: 404 });
            }
            return NextResponse.json({ ...product }, { status: 200 });
        }
        const products = await Product.find().populate('brand').populate('category');

        return NextResponse.json(products, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: 'Error happened ' }, { status: 500 });
    }
};

export const POST = async (req: NextRequest) => {
    await dbConnect();
    const { productName, productDetail, date, price, category, brand } = await req.json();

    try {
        const product = await Product.create({ productName, productDetail, date, price, category, brand });
        return NextResponse.json({ message: 'Product created successfully', product }, { status: 201 })

    } catch (error) {
        return NextResponse.json({ message: 'Error happened ' }, { status: 500 });
    }
}

export const DELETE = async (req: NextRequest) => {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    try {
        if (!id) {
            return NextResponse.json({ message: 'Product id is required' }, { status: 400 });            
        }
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return NextResponse.json({ message: 'Product not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Product deleted successfully', product }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error happened ' }, { status: 500 });
    }
}