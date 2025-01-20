"use client"
import { useEffect, useState } from "react";

// Components
import CardItem from "./card"

// Models
import ProductType from "@/models/product";
import axios from "axios";

const Homepage = () => {
    const [products, setProducts] = useState<ProductType[]>([]);

    useEffect(() => {
        axios.get("/api/product").then((res) => {
            const { data } = res || {}
            setProducts(data);
        })
    }, [])

    return (
        <div className="p-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {
                    products && products.map((item) => {
                        return <CardItem key={item._id} {...item} />
                    })
                }
            </div>
        </div>
    )
}

export default Homepage