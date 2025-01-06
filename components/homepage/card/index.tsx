
import Image from "next/image";


// Assets && Images
import "./Style.scss";
import ProductType from "@/models/product";


const CardItem = ({ id, brand, category, date, price, productDetail, productName }: ProductType) => {
    return (

        <div className="cart-container">
            <div className="flex flex-col">
                <Image
                    src="/assets/images/cards/empty.png"
                    layout="responsive"
                    width={500}
                    height={500}
                    alt="Picture of the author"
                />
                <div className="grid gap-2">Brand: {brand?.name} - Category: {category?.name}</div>
                <div className="grid gap-2">Date: {date}</div>
                <div className="grid gap-2">
                    <div className="flex justify-between items-center w-full">
                        <div>Product Name: {productName}</div>
                        <div>Price: {price}₺</div>
                    </div>
                </div>
                <div className="grid gap-2">
                    Description: {productDetail}
                </div>
                <div className="grid gap-2 mt-2">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Sepete Ekle
                    </button>
                </div>
            </div>
        </div>

    )
}

export default CardItem