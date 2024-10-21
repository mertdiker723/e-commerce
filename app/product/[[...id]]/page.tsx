"use client"

import { useEffect, useReducer } from "react";
import { useRouter } from "next/navigation";
import uniqid from 'uniqid';

// Components
import Button from "@/common/Button";
import Input from "@/common/Input";
import Select from "@/common/Select";

// Models
import ProductType from "@/models/product";
import BrandType from "@/models/brand";
import CategoryType from "@/models/category";

// Styles
import "./Styles.scss";


type ProductStateType = {
    brands: BrandType[];
    categories: CategoryType[];
    selects: any[];
    data: ProductType;
}

const Product = ({ params }: { params: { id: string[] } }) => {
    const [state, setState] = useReducer((currentState: ProductStateType, newState: Partial<ProductStateType>) => ({ ...currentState, ...newState }), {
        brands: [],
        categories: [],
        selects: [],
        data: {} as ProductType
    });
    const { brands, categories, selects, data } = state;

    const router = useRouter();

    useEffect(() => {
        const id = params?.id?.[0];
        if (!id) return;
        if (localStorage.getItem("products")) {

            const productsArray: ProductType[] = JSON.parse(localStorage.getItem("products") || "[]");

            const findedProduct = productsArray.find(item => item.id === id);
            if (findedProduct) {
                setState({
                    data: findedProduct
                });
            }
        } localStorage.getItem("products")


    }, [params?.id]);

    const inputs = [
        { label: "Product Name:", type: "text", name: "productName", maxLength: 30, placeHolder: "Product Name", defaultValue: data.productName },
        { label: "Product Detail:", type: "text", name: "productDetail", maxLength: 50, placeHolder: "Product Detail", defaultValue: data.productDetail },
        { label: "Price:", type: "number", name: "price", maxLength: 10, placeHolder: "Price", defaultValue: (data.price || "").toString() },
        { label: "Date:", type: "date", name: "date", defaultValue: data.date }
    ];

    useEffect(() => {
        const categoriesFromLocalStorage = JSON.parse(localStorage.getItem("categories") || '[]') as CategoryType[];
        const brandsFromLocalStorage = JSON.parse(localStorage.getItem("brands") || '[]') as BrandType[];

        const categoryDefaultValue = categoriesFromLocalStorage.find(item => item?.id === data.category?.id);
        const brandDefaultValue = brandsFromLocalStorage.find(item => item?.id === data.brand?.id);


        setState({
            selects: [
                { label: "Category", data: categories, name: "category", defaultValue: categoryDefaultValue },
                { label: "Brand", data: brands, name: "brand", defaultValue: brandDefaultValue }
            ]
        });

    }, [data.category?.id, data.brand?.id, categories, brands]);

    useEffect(() => {
        const brandItems: BrandType[] = JSON.parse(localStorage.getItem("brands") || "[]");
        const categoryItems: CategoryType[] = JSON.parse(localStorage.getItem("categories") || "[]");

        setState({
            brands: brandItems,
            categories: categoryItems
        });
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
        if (productName.trim()) {
            if (data.id) {
                const updatedProductsArray = productsArray.map(product => {
                    if (product.id === data.id) {
                        return { ...product, productName, productDetail, date, price, brand, category };
                    }
                    return product;
                });

                const updatedProductsArrayString = JSON.stringify(updatedProductsArray);
                localStorage.setItem("products", updatedProductsArrayString);

                router.push("/productListing");
            } else {
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
            }
        }
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
                text={`${data.id ? "Update" : "Send"}`}
                customClassName={`btn-product ${data.id ? "bg-color-green" : "bg-color-open-red"}`}
                type="submit"
            />
        </form>
    )
}

export default Product