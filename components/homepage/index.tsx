"use client"
import { useEffect, useState } from "react";

// Components
import CardItem from "./card"

// Models
import ProductType from "@/models/product";

const Homepage = () => {
    const [data, setData] = useState<ProductType[]>([]);

    useEffect(() => {
        let productArray: ProductType[] = JSON.parse(localStorage.getItem("products") || "[]");
        setData(productArray);
    }, [])

    return (
        <div className="p-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {
                    data && data.map((item) => {
                        return <CardItem key={item.id} {...item} />
                    })
                }
            </div>
        </div>
    )
}

export default Homepage