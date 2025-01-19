import mongoose from "mongoose";

interface ICategory extends Document {
    name: string;
    createdAt: Date;
    updatedAt: Date;
}


const categoryShema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
    }, { timestamps: true });

const Category = mongoose.models.Category || mongoose.model<ICategory>('Category', categoryShema);


export default Category;