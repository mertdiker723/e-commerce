'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

// Components
import Button from "@/common/Button";

// Models
import CategoryType from "@/models/category";

// Styles
import "./Style.scss";

const CategoryListing = () => {
    const router = useRouter()

    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        axios.get("/api/category")
            .then(res => {
                const { data } = res || {};
                setCategories(data)
            }).catch(err => {
                setErrorMessage(err.message)
            })

    }, [])

    const deleteCategory = (id: string) => {
        axios.delete(`/api/category?id=${id}`)
            .then(res => {
                const { data } = res || {};
                const { category } = data || [];

                const filteredCategories = categories.filter(item => item._id !== category._id);
                setCategories(filteredCategories);

            }).catch(err => {
                setErrorMessage(err.message);
            })
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
                        categories.map((item) => {
                            const { _id, name } = item || {};
                            return (
                                <tr key={_id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <td className="px-6 py-4">{_id}</td>
                                    <td className="px-6 py-4">{name}</td>
                                    <td className="px-6 py-4 flex justify-end">
                                        <Button type="button" text="Delete" onClick={() => deleteCategory(_id)} customClassName="bg-color-open-red width-fix mr-3" />
                                        <Button type="button" text="Edit" onClick={() => router.push(`/category/${_id}`)} customClassName="bg-color-green width-fix" />
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            {errorMessage && (
                <div className="flex justify-center mt-4">
                    <p className="text-red-500">{errorMessage}</p>
                </div>
            )}
        </div>
    )
}

export default CategoryListing