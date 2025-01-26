import mongoose, { Schema, Document } from 'mongoose';

interface IBrand extends Document {
    name: string;
}

const BrandSchema: Schema = new Schema({
    name: { type: String, required: true }
});

const Brand = mongoose.models.Brand || mongoose.model<IBrand>('Brand', BrandSchema);
export default Brand;