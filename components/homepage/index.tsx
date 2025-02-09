"use client"
import { useEffect, useState } from "react";

// Components
import CardItem from "./card"

// Models
import ProductType from "@/models/product";
import axios from "axios";

const Homepage = () => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        axios.get("/api/product").then((res) => {
            const { data } = res || {}
            setProducts(data);
        }).catch((error) => {
            setErrorMessage(error.message);
        }).finally(() => {
            setIsLoading(false);
        })
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <div className="p-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {
                    products && products.map((item) => {
                        return <CardItem key={item._id} setErrorMessage={setErrorMessage} {...item} />
                    })
                }
            </div>
            {errorMessage && (
                <div className="flex justify-center mt-4">
                    <p className="text-red-500">{errorMessage}</p>
                </div>
            )}
        </div>
    )
}

export default Homepage