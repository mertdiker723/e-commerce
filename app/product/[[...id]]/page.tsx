"use client"
import { useEffect, useReducer } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

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
    errorMessage: string;
    isloading: boolean;
}

const Product = ({ params }: { params: { id: string[] } }) => {
    const [state, setState] = useReducer((currentState: ProductStateType, newState: Partial<ProductStateType>) => ({ ...currentState, ...newState }), {
        brands: [],
        categories: [],
        selects: [],
        data: {} as ProductType,
        errorMessage: '',
        isloading: false
    });
    const { brands, categories, selects, data, errorMessage } = state;
    const router = useRouter();

    useEffect(() => {
        const id = params?.id?.[0];
        if (!id) return;

        axios.get(`/api/product?id=${id}`).then(res => {
            const { data } = res || {}
            setState({
                data
            })
        }).catch(error => {
            setState({
                errorMessage: error.message
            });
        })

    }, [params?.id]);

    // Input Fields
    const inputs = [
        { label: "Product Name:", type: "text", name: "productName", maxLength: 30, placeHolder: "Product Name", defaultValue: data.productName, required: true },
        { label: "Product Detail:", type: "text", name: "productDetail", maxLength: 50, placeHolder: "Product Detail", defaultValue: data.productDetail, required: false },
        { label: "Price:", type: "number", name: "price", maxLength: 10, placeHolder: "Price", defaultValue: (data.price || "").toString(), required: true },
        { label: "Date:", type: "date", name: "date", defaultValue: data.date, required: false }
    ];

    useEffect(() => {
        const fetchCategories = axios.get("/api/category");
        const fetchBrands = axios.get("/api/brand");

        Promise.all([fetchCategories, fetchBrands])
            .then(([categoriesRes, brandsRes]) => {
                const selectedCategory = categoriesRes?.data?.find((category: CategoryType) => category?._id === data?.category?._id) || {};
                const selectedBrand = brandsRes?.data?.find((brand: BrandType) => brand?._id === data?.brand?._id) || {};
                setState({
                    selects: [
                        { label: "Category", data: categoriesRes?.data, name: "category", defaultValue: selectedCategory },
                        { label: "Brand", data: brandsRes?.data, name: "brand", defaultValue: selectedBrand }
                    ],
                    categories: categoriesRes.data,
                    brands: brandsRes.data
                });
            })
            .catch(error => {
                setState({
                    errorMessage: error.message
                });
            });
    }, [data?.brand?._id, data?.category?._id]);
    const handleSubmitApi = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const id = params?.id?.[0];
        const formData = new FormData(e.currentTarget);
        const productName = formData.get("productName") as string;
        const productDetail = formData.get("productDetail") as string;
        const price = formData.get("price") as string;
        const date = formData.get("date") as string;
        const categoryId = formData.get("category") as string;
        const brandId = formData.get("brand") as string;

        if (!productName.trim() || !price.trim()) return;

        const payload = {
            productName,
            productDetail,
            price: +price,
            date,
            brand: brands.find(brand => brand._id === brandId),
            category: categories.find(category => category._id === categoryId)
        };
        const apiCall = id
            ? axios.put(`/api/product?id=${id}`, payload)
            : axios.post("/api/product", payload);
        apiCall.then(res => {
            const { status } = res || {};
            if ((id && status === 200) || (!id && status === 201)) {

                router.push("/productListing");
            }
        }).catch(error => {
            setState({ errorMessage: error.message });
        })
    }


    return (
        <form onSubmit={handleSubmitApi} className="container mx-auto mt-8 product-container">
            {inputs.map((input, index) => (
                <Input key={index} {...input} />
            ))}
            {selects.map((select, index) => (
                <Select key={index} {...select} />
            ))}
            <Button
                text={`${data._id ? "Update" : "Send"}`}
                customClassName={`btn-product ${data._id ? "bg-color-green" : "bg-color-open-red"}`}
                type="submit"
            />
            {errorMessage && (
                <div className="flex justify-center mt-4">
                    <p className="text-red-500">{errorMessage}</p>
                </div>
            )}
        </form>
    )
}

export default Product