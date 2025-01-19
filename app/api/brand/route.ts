import { NextRequest, NextResponse } from 'next/server';

import dbConnect from './../../../lib/mongodb';
import Brand from '@/models/api/brand';


export const GET = async (request: NextRequest) => {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    try {

        if (id) {
            const brand = await Brand.findById(id);
            if (!brand) {
                return NextResponse.json({ message: 'Brand not found' }, { status: 404 });
            }
            return NextResponse.json(brand, { status: 200 });
        } else {
            const brands = await Brand.find();
            return NextResponse.json(brands, { status: 200 });
        }

    } catch (error) {
        return NextResponse.json({ message: 'Error happened' }, { status: 500 });
    }

}

export const POST = async (request: NextRequest) => {
    await dbConnect();
    const { name } = await request.json();
    try {
        const brand = await Brand.create({ name });
        return NextResponse.json({ message: 'Brand created successfully', brand }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Error happened' }, { status: 500 });
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
        const updatedBrand = await Brand.findByIdAndUpdate(id, { name });

        if (!updatedBrand) {
            return NextResponse.json({ message: 'Brand not found' }, { status: 404 });
        } else {
            return NextResponse.json({ message: 'Brand updated successfully', brand: updatedBrand }, { status: 200 });
        }
    } catch (error) {
        return NextResponse.json({ message: 'Error happened' }, { status: 500 });
    }
}

export const DELETE = async (request: NextRequest) => {
    await dbConnect();
    const { id } = await request.json();
    try {
        if (!id) {
            return NextResponse.json({ message: 'Brand id is required' }, { status: 400 });
        }
        const deletedBrand = await Brand.findByIdAndDelete(id);
        return NextResponse.json({ message: 'Brand deleted successfully', brand: deletedBrand }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error happened' }, { status: 500 });
    }
}