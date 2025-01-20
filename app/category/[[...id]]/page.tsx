'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import axios from 'axios';

// Components
import Button from "@/common/Button"
import Input from "@/common/Input"

// Models
import CategoryType from '@/models/category';

// Styles
import "./Styles.scss"

const Category = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [category, setCategory] = useState<CategoryType>({} as CategoryType);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const params = useParams() as { id: string[] };
    const router = useRouter();

    useEffect(() => {
        const id = params?.id?.[0];
        if (!id) return;

        axios.get(`/api/category?id=${id}`).then(res => {
            const { data } = res || {};
            setCategory(data);
        }).catch(error => {
            setErrorMessage(error.message);
        })

    }, [params?.id]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        const value = formData.get("category") as string;
        const id = params?.id?.[0];
        if (value.trim()) {
            setIsLoading(true);
            const apiCall = id
                ? axios.put(`/api/category?id=${category._id}`, { name: value })
                : axios.post("/api/category", { name: value });

            apiCall.then(res => {
                const { status } = res || {};
                if ((id && status === 200) || (!id && status === 201)) {
                    setIsLoading(false);
                    router.push("/categoryListing");
                }
            }).catch(error => {
                setIsLoading(false);
                setErrorMessage(error.message);
            });
        }
    }

    return (
        <form onSubmit={handleSubmit} className="container mx-auto mt-8 category-container">
            <Input
                label="Category Name:"
                type="text"
                maxLength={50}
                placeHolder="Category Name"
                name="category"
                defaultValue={category.name || ""}
                required
            />
            <Button
                text={`${category._id ? "Update" : "Send"}`}
                customClassName={`btn-category ${category._id ? "bg-color-green" : "bg-color-open-red"}`}
                type="submit"
                loading={isLoading}
            />
            {errorMessage && (
                <div className="flex justify-center mt-4">
                    <p className="text-red-500">{errorMessage}</p>
                </div>
            )}
        </form>
    )
}

export default Category