import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";

// Models
import ProductType from "@/models/product";

// Common
import Button from "@/common/Button";

// Assets && Images
import "./Style.scss";
import { formatDate } from "@/core/helper";

interface CardItemProps extends ProductType {
    setErrorMessage: (message: string) => void;
}

const CardItem = (props: CardItemProps) => {
    const { _id, brand, category, date, price, productDetail, productName, setErrorMessage } = props;
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = (product: ProductType) => {
        setIsLoading(true);
        axios.post("/api/cart", {
            product,
        }).then((res) => {
            const { data, status } = res || {}
            if (status === 201) {
                const { cart } = data || {};
                const { product, itemCount } = cart || {};

                dispatch({
                    type: 'CART_UPDATE_COUNT', payload: {
                        ...product, itemCount,
                    }
                });

            }
        }).catch((error) => {
            setErrorMessage(error.message);
        }).finally(() => {
            setIsLoading(false);
        })
    }
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
            <div className="grid gap-2">Date: {formatDate(date)}</div>
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
                <Button
                    onClick={() => handleSubmit({ _id, brand, category, date, price, productDetail, productName })}
                    type="button"
                    customClassName="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    text="Sepete Ekle"
                    loading={isLoading}
                />
            </div>

        </div>

    )
}

export default CardItem