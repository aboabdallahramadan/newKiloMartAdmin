"use client";
import React, { useState,useEffect } from 'react';
import { useParams } from 'next/navigation';
import InputGroup from '@/components/FormElements/InputGroup';
import { toast } from 'react-toastify';
import CategorySelect from '@/components/Products/Categories/CategorySelect';
import { useRouter } from 'next/navigation';
import ElementLoader from '../common/ElementLoader';
import { ProductLocalized } from '@/types/productLocalized';
const EditProduct = () => {
  const router = useRouter();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null);
  const [categoryId, setCategoryId] = useState<number | null>(0);
  const [loading, setLoading] = useState(false);
  const [productE, setProductE] = useState<ProductLocalized | null>(null);
  const [productR, setProductR] = useState<ProductLocalized | null>(null);

  const [arabicData, setArabicData] = useState({
    Name: '',
    Description: '',
    MeasurementUnit: '',
  });
  const [englishData, setEnglishData] = useState({
    Name: '',
    Description: '',
    MeasurementUnit: '',
  });

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/backend/api/admin/product/${id}/localized-values`);
                if(response.ok)
                {
                    const data = await response.json();
                    setProductR(data.data[0]);
                    setProductE(data.data[1]);
                    setArabicData({
                        Name: data.data[0].name,
                        Description: data.data[0].description,
                        MeasurementUnit: data.data[0].measurementUnit,
                    });
                    setEnglishData({
                        Name: data.data[1].name,
                        Description: data.data[1].description,
                        MeasurementUnit: data.data[1].measurementUnit,
                    });
                }
                else {
                    console.log(response)
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            };
        };
        fetchProduct();
    }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (file) {
      formData.append('Image', file);
    }
    if(categoryId) {
      formData.append('ProductCategory', categoryId.toString());
    }
    formData.append('ProductDataAr.Name', arabicData.Name);
    formData.append('ProductDataAr.Description', arabicData.Description);
    formData.append('ProductDataAr.MeasurementUnit', arabicData.MeasurementUnit);
    formData.append('ProductDataEn.Name', englishData.Name);
    formData.append('ProductDataEn.Description', englishData.Description);
    formData.append('ProductDataEn.MeasurementUnit', englishData.MeasurementUnit);
    formData.append('IsActive', 'true');

    try {
      setIsLoading(true);
      const response = await fetch(`/backend/api/product/${id}`, {
        method: 'PUT',
        body: formData,
      });
      const data = await response.json();
      if (data.status) {
        toast.success('Product Updated successfully!', { autoClose: 3000 });
        router.push('/products/all');
      } else {
        toast.error(data.message || 'Failed to Update product.', { autoClose: 3000 });
        console.log(data.message)
      }
    } catch (error) {
      toast.error('An error occurred while updating the product.', { autoClose: 3000 });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    {
        isLoading ? (
            <ElementLoader />
        ) : (
            <form onSubmit={handleSubmit} className="p-6 rounded-lg bg-white dark:bg-gray-dark shadow-md">
                <CategorySelect category={categoryId} setCategory={setCategoryId} />
                <InputGroup
                    label="Upload Product Image"
                    placeholder="Upload Image"
                    type="file"
                    onChange={handleFileChange}
                    customClasses="mb-4 mt-4"
                    inputClasses=" w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke px-3 py-[9px] outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-stroke file:px-2.5 file:py-1 file:text-body-xs file:font-medium file:text-dark-5 focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-dark dark:border-dark-3 dark:bg-dark-2 dark:file:border-dark-3 dark:file:bg-white/30 dark:file:text-white"
                />
                <h3 className="font-semibold text-dark dark:text-white mb-2">Arabic Data</h3>
                <InputGroup
                    label="Name"
                    type="text"
                    placeholder="Enter name in Arabic"
                    value={arabicData.Name}
                    onChange={(e) => setArabicData({ ...arabicData, Name: e.target.value })}
                    customClasses="mb-4"
                />
                <InputGroup
                    label="Description"
                    type="text"
                    placeholder="Enter description in Arabic"
                    value={arabicData.Description}
                    onChange={(e) => setArabicData({ ...arabicData, Description: e.target.value })}
                    customClasses="mb-4"
                />
                <InputGroup
                    label="Measurement Unit"
                    type="text"
                    placeholder="Enter measurement unit in Arabic"
                    value={arabicData.MeasurementUnit}
                    onChange={(e) => setArabicData({ ...arabicData, MeasurementUnit: e.target.value })}
                    customClasses="mb-4"
                />
                <h3 className="font-semibold text-dark dark:text-white mb-2">English Data</h3>
                <InputGroup
                    label="Name"
                    type="text"
                    placeholder="Enter name in English"
                    value={englishData.Name}
                    onChange={(e) => setEnglishData({ ...englishData, Name: e.target.value })}
                    customClasses="mb-4"
                />
                <InputGroup
                    label="Description"
                    type="text"
                    placeholder="Enter description in English"
                    value={englishData.Description}
                    onChange={(e) => setEnglishData({ ...englishData, Description: e.target.value })}
                    customClasses="mb-4"
                />
                <InputGroup
                    label="Measurement Unit"
                    type="text"
                    placeholder="Enter measurement unit in English"
                    value={englishData.MeasurementUnit}
                    onChange={(e) => setEnglishData({ ...englishData, MeasurementUnit: e.target.value })}
                    customClasses="mb-4"
                />
                <button
                    type="submit"
                    className="bg-primary text-white py-2 px-4 rounded">
                    {
                        isLoading ? (
                        <ElementLoader color='white'/>
                        ) : (
                        <span>Update Product</span>
                        )
                    }
                    
                </button>
            </form>
        )
    }
    </>
    
  );
};

export default EditProduct;