'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import axios from 'axios';

// Components
import Button from "@/common/Button"
import Input from "@/common/Input"

// Models
import BrandType from '@/models/brand';

// Styles
import "./Styles.scss"

const Brand = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<BrandType>({} as BrandType);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const params = useParams() as { id: string[] };
  const router = useRouter();

  useEffect(() => {
    const fetchBrand = async () => {
      const id = params?.id?.[0];
      if (!id) return
      try {
        const response = await axios.get(`/api/brand?id=${id}`);
        const { data } = response || {};
        setData(data);
      } catch (error: any) {
        setErrorMessage(error.message);
      }
    };

    fetchBrand();
  }, [params?.id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const value = formData.get("brand") as string;

    if (!value.trim()) return;

    setIsLoading(true);
    try {
      const response = data?._id
        ? await axios.put(`/api/brand?id=${data._id}`, { name: value })
        : await axios.post('/api/brand', { name: value });

      const { status } = response || {};
      if ((data?._id && status === 200) || (!data?._id && status === 201)) {
        router.push("/brandListing");
      }
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="container mx-auto mt-8 brand-container">
        <Input
          label="Brand Name:"
          type="text"
          maxLength={50}
          placeHolder="Brand Name"
          name="brand"
          defaultValue={data?.name || ""}
          required
        />
        <Button
          text={`${data._id ? "Update" : "Send"}`}
          customClassName={`btn-brand ${data._id ? "bg-color-green" : "bg-color-open-red"}`}
          type="submit"
          loading={isLoading}
        />
      </form>
      {errorMessage && (
        <div className="flex justify-center mt-4">
          <p className="text-red-500">{errorMessage}</p>
        </div>
      )}
    </>
  )
}

export default Brand