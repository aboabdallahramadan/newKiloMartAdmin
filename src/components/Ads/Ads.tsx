"use client";
import React, { useState } from 'react';
import { Ads as AdsType } from '@/types/ads';
import Image from 'next/image';
import { toast } from 'react-toastify';
import InputGroup from '../FormElements/InputGroup';
import { FaEdit } from 'react-icons/fa';
import { BiEdit, BiStop } from 'react-icons/bi';
import { CgCheck } from 'react-icons/cg';
import { TbEditCircleOff } from 'react-icons/tb';

const Ads: React.FC = () => {
  const [ads, setAds] = useState<AdsType[]>([
    {
      id: 1,
      title: "Summer Sale 2024",
      imageUrl: "/images/product/product-01.png",
      isActive: true
    },
    {
      id: 2,
      title: "New Products Launch",
      imageUrl: "/images/product/product-02.png",
      isActive: false
    }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    imageUrl: '',
    isActive: false
  });

  const handleOpenModal = (ad?: AdsType) => {
    if (ad) {
      setEditingId(ad.id);
      setFormData({
        title: ad.title,
        imageUrl: ad.imageUrl,
        isActive: ad.isActive
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        imageUrl: '',
        isActive: false
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({
      title: '',
      imageUrl: '',
      isActive: false
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      setAds(ads.map(ad => 
        ad.id === editingId 
          ? { ...ad, ...formData }
          : ad
      ));
      toast.success('Ad updated successfully!');
    } else {
      const newAd = {
        id: ads.length + 1,
        ...formData
      };
      setAds([...ads, newAd]);
      toast.success('Ad created successfully!');
    }
    handleCloseModal();
  };

  const toggleAdStatus = (id: number) => {
    setAds(ads.map(ad => 
      ad.id === id ? { ...ad, isActive: !ad.isActive } : ad
    ));
    toast.success('Ad status updated successfully!');
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
                label="Title"
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Enter ad title"
              />
              <InputGroup
                label="Image In 200x400"
                type="file"
                onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                placeholder="Enter image URL"
                customClasses=''
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                />
                <label>Active</label>
              </div>
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
            <div className="relative h-48 mb-4">
              <Image 
                src={ad.imageUrl} 
                alt={ad.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <h3 className="text-lg font-semibold text-dark dark:text-white mb-2">{ad.title}</h3>
            <div className="flex justify-between items-center">
              <span className={`px-3 py-1 rounded-full text-sm ${
                ad.isActive 
                  ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400'
                  : 'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400'
              }`}>
                {ad.isActive ? 'Active' : 'Inactive'}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleOpenModal(ad)}
                  className="text-xl text-primary hover:text-primary/80"
                  title="Edit"
                >
                  <TbEditCircleOff />
                </button>
                <button
                  onClick={() => toggleAdStatus(ad.id)}
                  className="text-3xl"
                  title={ad.isActive ? 'Deactivate' : 'Activate'}
                >
                  {ad.isActive ? (
                    <BiStop  className='text-rose-600'/>
                  ) : (
                    <CgCheck className='text-green-600'/>
                  )}
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
