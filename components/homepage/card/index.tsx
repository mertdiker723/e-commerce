import { useDispatch } from "react-redux";
import Image from "next/image";

// Models
import ProductType from "@/models/product";

// Assets && Images
import "./Style.scss";

const CardItem = ({ _id, brand, category, date, price, productDetail, productName }: ProductType) => {
    const dispatch = useDispatch();
    const addToCart = () => {
        dispatch({
            type: 'CART_ONE_ADD', payload: {
                product: { _id, brand, category, date, price, productDetail, productName },
            }
        });
    };
    return (
        <div className="cart-container">
            <Image
                src="/assets/images/cards/empty.png"
                layout="responsive"
                width={500}
                height={500}
                alt="Picture of the author"
            />
            <div className="grid gap-2 mt-2"><b>Brand: {brand?.name} - Category: {category?.name}</b></div>
            <div className="grid gap-2">Date: {new Date(date).toLocaleDateString('tr-TR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            })}</div>
            <div className="grid gap-2 mt-1">
                <div className="flex justify-between items-center w-full">
                    <div>Product Name: {productName}</div>
                    <div><b>Price: {price}₺</b></div>
                </div>
            </div>
            <div className="grid gap-2 font-light font-sans">
                Description: {productDetail}
            </div>
            <div className="grid gap-2 mt-2">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={addToCart}>
                    Sepete Ekle
                </button>
            </div>

        </div>

    )
}

export default CardItem