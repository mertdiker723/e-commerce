'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import uniqid from 'uniqid';

// Components
import Button from "@/components/Button"
import Input from "@/components/Input"

// Models
import CategoryType from '@/models/category';

// Styles
import "./Styles.scss"

const Category = () => {
    const [data, setData] = useState<CategoryType>({} as CategoryType);

    const params = useParams() as { id: string[] };
    const router = useRouter();

    useEffect(() => {
        const id = params?.id?.[0];
        if (!id) return;

        const categoriesArray: CategoryType[] = JSON.parse(localStorage.getItem("categories") || "[]");

        const findedCategory = categoriesArray.find(item => item.id === id);
        if (findedCategory) {
            setData(findedCategory);
        }

    }, [params?.id]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        const value = formData.get("category") as string;
        if (value.trim()) {
            let categoriesArray: CategoryType[] = JSON.parse(localStorage.getItem("categories") || "[]");

            if (data.id) {
                const updatedCategoriesArray = categoriesArray.map(category => {
                    if (category.id === data.id) {
                        return { ...category, name: value };
                    }
                    return category;
                });

                const updatedCategoriesArrayString = JSON.stringify(updatedCategoriesArray);
                localStorage.setItem("categories", updatedCategoriesArrayString);
                setData({ ...data, name: value });

                router.push("/categoryListing")

            } else {
                const categoryObject = { id: uniqid(), name: value };
                categoriesArray.push(categoryObject);
                const updatedCategoriesArrayString = JSON.stringify(categoriesArray);
                localStorage.setItem("categories", updatedCategoriesArrayString);
            }

            e.currentTarget.reset();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="container mx-auto mt-8 category-container">
            <Input
                label="Category Name:"
                type="text"
                maxLength={50}
                placeHolder="Category Name"
                name="category"
                defaultValue={data.name || ""}
            />
            <Button
                text={`${data.id ? "Update" : "Send"}`}
                customClassName={`btn-category ${data.id ? "bg-color-green" : "bg-color-open-red"}`}
                type="submit"
            />
        </form>
    )
}

export default Category