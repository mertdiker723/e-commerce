import mongoose from "mongoose";

interface IProduct extends Document {
    productName: string;
    productDetail: string;
    date: Date;
    price: number;
    category: mongoose.Schema.Types.ObjectId;
    brand: mongoose.Schema.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

const productSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: true
        },
        productDetail: {
            type: String,
        },
        date: {
            type: Date,
        },
        price: {
            type: Number,
            required: true
        },
        category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
        brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' }
    },
    {
        timestamps: true
    }
);

const Product = mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);

export default Product; 