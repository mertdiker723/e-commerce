import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

import dbConnect from "@/lib/mongodb";
import Product from "@/models/api/product";

// models
import "@/models/api/brand";
import "@/models/api/category";


export const GET = async (req: NextRequest) => {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    let token = null;
    const authHeader = req.headers.get('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    }

    let decodedToken = null;
    if (token) {
        try {
            decodedToken = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET as string) as { userId: string };
        } catch (error) {
            return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
        }
    }

    if (!decodedToken?.userId) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        if (id) {
            const product = await Product.findOne({ _id: id, userId: decodedToken.userId }).populate({ path: 'brand', select: "name" }).populate({ path: 'category', select: "name" });
            if (!product) {
                return NextResponse.json({ message: 'Product not found' }, { status: 404 });
            }
            return NextResponse.json(product, { status: 200 });
        }

        const products = await Product.find({ userId: decodedToken.userId }).populate({ path: 'category' }).populate({ path: 'brand' });


        return NextResponse.json(products, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
};

export const POST = async (req: NextRequest) => {
    await dbConnect();
    const { productName, productDetail, date, price, category, brand } = await req.json();
    let token = null;
    const authHeader = req.headers.get('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    }
    let decodedToken = null;
    if (token) {
        try {
            decodedToken = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET as string) as { userId: string; email: string; password: string; iat: number; exp: number };
        } catch (error) {
            return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
        }
    }

    let tId = decodedToken?.userId;

    try {
        const product = await Product.create({ productName, productDetail, date, price, userId: tId, category, brand });
        return NextResponse.json({ message: 'Product created successfully', product }, { status: 201 })

    } catch (error) {
        return NextResponse.json({ message: 'Error happened ' }, { status: 500 });
    }
}

export const PUT = async (req: NextRequest) => {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const { productName, productDetail, date, price, category, brand } = await req.json();

    if (!id) {
        return NextResponse.json({ message: 'Product id is required' }, { status: 400 });
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, { productName, productDetail, date, price, category, brand });

        if (!updatedProduct) {
            return NextResponse.json({ message: 'Product not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Product updated successfully', updatedProduct }, { status: 200 });
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