'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Components
import Button from "@/components/Button";

// Models
import CategoryType from "@/models/category";

// Styles
import "./Style.scss";

const CategoryListing = () => {
    const router = useRouter()

    const [data, setData] = useState<CategoryType[]>([]);

    useEffect(() => {
        let categoriesArray: CategoryType[] = JSON.parse(localStorage.getItem("categories") || "[]");
        setData(categoriesArray);
    }, [])

    const deleteCategory = (id: string) => {
        const categoriesArray = data.filter(item => item.id !== id);

        localStorage.setItem("categories", JSON.stringify(categoriesArray));        

        setData(categoriesArray)
    }
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8 container mx-auto p-0">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="ttext-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Id</th>
                        <th scope="col" className="px-6 py-3">Name</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item) => {
                            const { id, category } = item || {};
                            return (
                                <tr key={id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <td className="px-6 py-4">{id}</td>
                                    <td className="px-6 py-4">{category}</td>
                                    <td className="px-6 py-4 flex justify-end">
                                        <Button type="button" text="Delete" onClick={() => deleteCategory(id)} customClassName="bg-color-open-red width-fix mr-3" />
                                        <Button type="button" text="Edit"  onClick={() => router.push(`/category/${id}`)} customClassName="bg-color-green width-fix" />
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default CategoryListing