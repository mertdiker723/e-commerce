'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Components
import Button from "@/common/Button";

// Models
import BrandType from "@/models/brand";

// Styles
import "./Style.scss";
import axios from "axios";

const BrandListing = () => {
    const router = useRouter()

    const [brands, setBrands] = useState<BrandType[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        axios.get("/api/brand").then((res) => {
            const { data } = res || {};
            setBrands(data);

        }).catch((error) => {
            setErrorMessage(error.message);
        });
    }, [])

    const deleteBrand = (id: string) => {
        axios.delete("/api/brand", { data: { id } }).then((res) => {
            const { data } = res || {};
            const { brand } = data || [];

            const filteredData = brands.filter((item) => item._id !== brand._id);
            setBrands(filteredData);

        }).catch((error) => {
            setErrorMessage(error.message);
        });
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
                        brands.map((item) => {
                            const { _id, name } = item || {};
                            return (
                                <tr key={_id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <td className="px-6 py-4">{_id}</td>
                                    <td className="px-6 py-4">{name}</td>
                                    <td className="px-6 py-4 flex justify-end">
                                        <Button type="button" text="Delete" onClick={() => deleteBrand(_id)} customClassName="bg-color-open-red width-fix mr-3" />
                                        <Button type="button" text="Edit" onClick={() => router.push(`/brand/${_id}`)} customClassName="bg-color-green width-fix" />
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

export default BrandListing