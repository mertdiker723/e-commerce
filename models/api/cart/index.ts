import mongoose, { Schema, Document } from 'mongoose';

interface ICart extends Document {
    product: mongoose.Schema.Types.ObjectId;
    itemCount: number;
}

const cartSchema: Schema = new Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    itemCount: { type: Number, required: true }
}, {
    timestamps: true
});

export default mongoose.models.Cart || mongoose.model<ICart>('Cart', cartSchema);