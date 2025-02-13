"use client";
import React, { useState,useEffect } from 'react';
import { Ads as AdsType } from '@/types/ads';
import { toast } from 'react-toastify';
import InputGroup from '../FormElements/InputGroup';
import { TbEditCircleOff } from 'react-icons/tb';
import { FaTrash } from 'react-icons/fa';

const Ads: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [ads, setAds] = useState<AdsType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);


  const fetchAds = async () => {
    try {
      const response = await fetch('/backend/api/slider-item/list');
      if (response.ok) {
        const data = await response.json();
        setAds(data.data);
      }
      else {
        console.log(response.json())
      }
    } catch (error) {
      toast.error('Failed to load advertisements');
    }
  };

  useEffect(() => {

  
    fetchAds();
  }, []);
  const [formData, setFormData] = useState({
    imageUrl: '',
  });



  const handleOpenModal = (ad?: AdsType) => {
    if (ad) {
      setEditingId(ad.id);
      setFormData({
        imageUrl: ad.imageUrl
      });
    } else {
      setEditingId(null);
      setFormData({
        imageUrl: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({
      imageUrl: '',
    });
  };

  // Update the file input handler
const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
    setSelectedFile(e.target.files[0]);
  }
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    if (selectedFile) {
      formDataToSend.append('ImageFile', selectedFile);
    }
    
  
    if (editingId) {
      formDataToSend.append('id', editingId.toString());
      const response = await fetch(`/backend/api/slider-item?id=${editingId}`, {
        method: 'PUT',
        body: formDataToSend,
      });
  
      if (response.ok) {
        fetchAds();
        toast.success('Ad updated successfully!');
        setEditingId(null);
      } else {
        toast.error('Failed to update ad');
        setEditingId(null);
        console.log(response.json())
      }
    } else {
      const response = await fetch('/backend/api/slider-item/upload', {
        method: 'POST',
        body: formDataToSend,
      });
  
      if (response.ok) {
        fetchAds();
        toast.success('Ad created successfully!');
      } else {
        toast.error('Failed to create ad');
        console.log(response.json())
      }
    }
    
    handleCloseModal();
  };
  

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/backend/api/slider-item?id=${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        setAds(ads.filter(ad => ad.id !== id));
        toast.success('Ad deleted successfully!');
      } else {
        toast.error('Failed to delete ad');
      }
    } catch (error) {
      toast.error('Error deleting ad');
    }
  };
  
  

  return (
    <div className="p-4 bg-white dark:bg-gray-dark rounded-xl shadow-md">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-dark dark:text-white">Advertisements Management</h2>
        <button 
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80"
          onClick={() => handleOpenModal()}
        >
          Add New Ad
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999]">
          <div className="bg-white dark:bg-gray-dark p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">{editingId ? 'Edit Ad' : 'Add New Ad'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <InputGroup
                label="Image In 200x400"
                type="file"
                onChange={handleFileChange}
                placeholder="Enter image URL"
                customClasses=''
              />

              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg"
                >
                  {editingId ? 'Save Changes' : 'Add Ad'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ads.map((ad) => (
          <div key={ad.id} className="border dark:border-dark-3 rounded-lg p-4">
            <div className="relative overflow-hidden h-48 mb-4">
              <img 
                src={`${process.env.NEXT_PUBLIC_API_URL_MAIN}/${ad.imageUrl}`} 
                alt={"ad image"}
                className="object-cover rounded-lg"
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <button
                  onClick={() => handleOpenModal(ad)}
                  className="text-xl text-primary hover:text-primary/80"
                  title="Edit"
                >
                  <TbEditCircleOff />
                </button>
                <button
                  onClick={() => handleDelete(ad.id)}
                  className="text-xl text-red-500 hover:text-red-600"
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ads;
