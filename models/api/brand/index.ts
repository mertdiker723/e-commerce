import mongoose from "mongoose";


interface IBrand extends Document {
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

const brandSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Brand = mongoose.models.Brand || mongoose.model<IBrand>('Brand', brandSchema);

export default Brand;

