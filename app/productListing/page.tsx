'use client';

import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import axios from 'axios';

// Models
import ProductType from '@/models/product';

// Components
import Button from '@/common/Button';
import { formatDate } from '@/core/helper';


const ProductListing = () => {
  const router = useRouter();

  const [products, setProducts] = useState<ProductType[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    axios.get("/api/product").then(res => {
      const { data } = res || {};
      setProducts(data);
    }).catch(error => {
      setErrorMessage(error.message);
    })
  }, [])

  const deleteProduct = (id: string) => {
    axios.delete(`/api/product?id=${id}`).then(res => {
      const { data } = res || {};
      const newData = products?.filter((item: ProductType) => item._id !== data.product._id);
      setProducts(newData);
    }).catch(error => {
      setErrorMessage(error.message);
    })
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8 container mx-auto p-0">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="ttext-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Id</th>
            <th scope="col" className="px-6 py-3">Product Name</th>
            <th scope="col" className="px-6 py-3">Product Detail</th>
            <th scope="col" className="px-6 py-3">Date</th>
            <th scope="col" className="px-6 py-3">Price</th>
            <th scope="col" className="px-6 py-3">Category</th>
            <th scope="col" className="px-6 py-3">Brand</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {
            products && products.map((item) => {
              const { _id, productName, productDetail, date, price, brand, category } = item || {};
              return (
                <tr key={_id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <td className="px-6 py-4">{_id}</td>
                  <td className="px-6 py-4">{productName || '-'}</td>
                  <td className="px-6 py-4">{productDetail || '-'}</td>
                  <td className="px-6 py-4">{date ? formatDate(date) : '-'}</td>
                  <td className="px-6 py-4">{price || '-'}</td>
                  <td className="px-6 py-4">{category?.name || '-'}</td>
                  <td className="px-6 py-4">{brand?.name || '-'}</td>
                  <td className="px-6 py-4 flex justify-end">
                    <Button type="button" text="Delete" onClick={() => deleteProduct(_id)} customClassName="bg-color-open-red width-fix mr-3" />
                    <Button type="button" text="Edit" onClick={() => router.push(`/product/${_id}`)} customClassName="bg-color-green width-fix" />
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

export default ProductListing