import mongoose from "mongoose";


interface IBrand extends Document {
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new mongoose.Schema(
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

const Brand = mongoose.models.Brand || mongoose.model<IBrand>('Brand', userSchema);

export default Brand;

