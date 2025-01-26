import mongoose from 'mongoose';
import "@/models/api/brand";
import "@/models/api/category";
import "@/models/api/product";

const MONGO_URL = process.env.MONGODB_URI;

if (!MONGO_URL) {
    throw new Error('Please define the MONGODB_URI environmzent variable inside .env');
}

const dbConnect = async () => {
    if (mongoose.connection.readyState !== 1) {
        try {
            await mongoose.connect(MONGO_URL);
            // eslint-disable-next-line no-console
            console.log("Db connected");
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log('Error connecting to database: ', error);
            throw new Error('Error connecting to database');
        }
    } else {
        // eslint-disable-next-line no-console
        console.log("Db already connected");
    }
}

export default dbConnect;
