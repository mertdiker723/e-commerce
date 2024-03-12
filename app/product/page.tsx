"use client"

import { useEffect, useReducer } from "react";
import uniqid from 'uniqid';

// Components
import Button from "@/components/Button";
import Input from "@/components/Input";
import Select from "@/components/Select";

// Models
import ProductType from "@/models/product";
import BrandType from "@/models/brand";
import CategoryType from "@/models/category";

// Styles
import "./Styles.scss";

type ProductStateType = {
    brands: BrandType[];
    categories: CategoryType[];
}

const Product = () => {
    const [state, setState] = useReducer((currentState: ProductStateType, newState: Partial<ProductStateType>) => ({ ...currentState, ...newState }), {
        brands: [],
        categories: []
    });
    const { brands, categories } = state;

    const inputs = [
        { label: "Product Name:", type: "text", name: "productName", maxLength: 30, placeHolder: "Product Name" },
        { label: "Product Detail:", type: "text", name: "productDetail", maxLength: 50, placeHolder: "Product Detail" },
        { label: "Price:", type: "number", name: "price", maxLength: 10, placeHolder: "Price" },
        { label: "Date:", type: "date", name: "date" }
    ];

    const selects = [
        { label: "Category", data: categories, name: "category" },
        { label: "Brand", data: brands, name: "brand" }
    ];

    useEffect(() => {
        const brandItems: BrandType[] = JSON.parse(localStorage.getItem("brands") || "[]");
        const categoryItems: CategoryType[] = JSON.parse(localStorage.getItem("categories") || "[]");

        setState({
            brands: brandItems,
            categories: categoryItems
        })
    }, []);


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        const productName = formData.get("productName") as string;
        const productDetail = formData.get("productDetail") as string;
        const price = formData.get("price") as string;
        const date = formData.get("date") as string;
        const categoryId = formData.get("category") as string;
        const brandId = formData.get("brand") as string;

        const category = categories.find(item => item.id === categoryId);
        const brand = brands.find(item => item.id === brandId);

        let productsArray: ProductType[] = JSON.parse(localStorage.getItem("products") || "[]");

        const productObject = {
            id: uniqid(),
            productName,
            productDetail,
            price: +price,
            date,
            category: category ?? null,
            brand: brand ?? null
        };
        productsArray.push(productObject);

        const updatedProductsArrayString = JSON.stringify(productsArray);
        localStorage.setItem("products", updatedProductsArrayString);

        e.currentTarget.reset();
    };


    return (
        <form onSubmit={handleSubmit} className="container mx-auto mt-8 product-container">
            {inputs.map((input, index) => (
                <Input key={index} {...input} />
            ))}
            {selects.map((select, index) => (
                <Select key={index} {...select} />
            ))}
            <Button
                text="Send"
                customClassName="btn-product bg-color-open-red"
                type="submit"
            />
        </form>
    )
}

export default Product