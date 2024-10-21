'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import uniqid from 'uniqid';
import axios from 'axios';

// Components
import Button from "@/common/Button"
import Input from "@/common/Input"

// Models
import BrandType from '@/models/brand';

// Styles
import "./Styles.scss"

const Brand = () => {
  const [data, setData] = useState<BrandType>({} as BrandType);

  const params = useParams() as { id: string[] };
  const router = useRouter();

  useEffect(() => {
    axios.get('/api/users/7')
      .then(function (response) {
      })
  }, [])


  useEffect(() => {
    const id = params?.id?.[0];
    if (!id) return;

    const brandsArray: BrandType[] = JSON.parse(localStorage.getItem("brands") || "[]");

    const findedBrand = brandsArray.find(item => item.id === id);
    if (findedBrand) {
      setData(findedBrand);
    }

  }, [params?.id]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formData = new FormData(e.currentTarget);
    const value = formData.get("brand") as string;
    if (value.trim()) {
      let brandsArray: BrandType[] = JSON.parse(localStorage.getItem("brands") || "[]");

      if (data.id) {
        const updatedBrandsArray = brandsArray.map(brand => {
          if (brand.id === data.id) {
            return { ...brand, name: value };
          }
          return brand;
        });

        const updatedBrandsArrayString = JSON.stringify(updatedBrandsArray);
        localStorage.setItem("brands", updatedBrandsArrayString);
        setData({ ...data, name: value });

        router.push("/brandListing")

      } else {
        const brandObject = { id: uniqid(), name: value };
        brandsArray.push(brandObject);
        const updatedBrandsArrayString = JSON.stringify(brandsArray);
        localStorage.setItem("brands", updatedBrandsArrayString);
        e.currentTarget.reset();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mx-auto mt-8 brand-container">
      <Input
        label="Brand Name:"
        type="text"
        maxLength={50}
        placeHolder="Brand Name"
        name="brand"
        defaultValue={data?.name || ""}
      />
      <Button
        text={`${data.id ? "Update" : "Send"}`}
        customClassName={`btn-brand ${data.id ? "bg-color-green" : "bg-color-open-red"}`}
        type="submit"
      />
    </form>
  )
}

export default Brand