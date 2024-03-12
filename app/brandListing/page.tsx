'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Components
import Button from "@/components/Button";

// Models
import BrandType from "@/models/brand";

// Styles
import "./Style.scss";

const BrandListing = () => {
    const router = useRouter()

    const [data, setData] = useState<BrandType[]>([]);

    useEffect(() => {
        let brandsArray: BrandType[] = JSON.parse(localStorage.getItem("brands") || "[]");
        setData(brandsArray);
    }, [])

    const deleteBrand = (id: string) => {
        const brandsArray = data.filter(item => item.id !== id);

        localStorage.setItem("brands", JSON.stringify(brandsArray));        

        setData(brandsArray)
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
                            const { id, name } = item || {};
                            return (
                                <tr key={id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <td className="px-6 py-4">{id}</td>
                                    <td className="px-6 py-4">{name}</td>
                                    <td className="px-6 py-4 flex justify-end">
                                        <Button type="button" text="Delete" onClick={() => deleteBrand(id)} customClassName="bg-color-open-red width-fix mr-3" />
                                        <Button type="button" text="Edit"  onClick={() => router.push(`/brand/${id}`)} customClassName="bg-color-green width-fix" />
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

export default BrandListing