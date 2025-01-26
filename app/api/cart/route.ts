import { NextRequest, NextResponse } from "next/server";


import dbConnect from "@/lib/mongodb";
import Cart from "@/models/api/cart";



export const GET = async (request: NextRequest) => {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    try {
        if (id) {
            const cart = await Cart.findById(id);
            if (!cart) {
                return NextResponse.json({ message: 'Cart not found' }, { status: 404 });
            }
            return NextResponse.json(cart, { status: 200 });
        }
        const carts = await Cart.find().populate({ path: 'product' });

        return NextResponse.json(carts, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: 'Error happened' }, { status: 500 });
    }
}

export const POST = async (request: NextRequest) => {
    await dbConnect();
    const { product, count = 1 } = await request.json();

    try {
        let cart = await Cart.findOne({ product });
        if (cart) {
            cart.itemCount += count;
            await cart.save();
        } else {
            cart = await Cart.create({ product, itemCount: count });
        }
        cart = await cart.populate('product');
        return NextResponse.json({ message: 'Cart updated successfully', cart }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Error happened' }, { status: 500 });
    }
}


export const PUT = async (request: NextRequest) => {
    await dbConnect();
    const { product, riseCounting } = await request.json();
    try {
        let cart = await Cart.findOne({ product });
        if (!cart) {
            return NextResponse.json({ message: 'Cart not found' }, { status: 404 });
        }
       cart.itemCount += riseCounting ? 1 : -1;

       if (cart.itemCount === 0) {
           await cart.deleteOne();
           cart = await cart.populate('product');
           return NextResponse.json({ message: 'Cart deleted successfully', cart }, { status: 200 });
       }

       await cart.save();
       cart = await cart.populate('product');
       return NextResponse.json({ message: 'Cart updated successfully', cart }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error happened' }, { status: 500 });
    }
}


export const DELETE = async (request: NextRequest) => {
    await dbConnect();
    const { product } = await request.json();
    try {
        let cart = await Cart.findOne({ product });
        if (!cart) {
            return NextResponse.json({ message: 'Cart item is not found!' }, { status: 400 });
        }
        await cart.deleteOne();
        cart = await cart.populate('product');
        return NextResponse.json({ message: 'Cart deleted successfully', cart }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error happened' }, { status: 500 });
    }
}