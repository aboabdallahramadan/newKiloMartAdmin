"use client";
import React, { useState,useEffect } from 'react';
import { ProjectSettings as ProjectSettingsType } from '@/types/projectSettings';
import { toast } from 'react-toastify';
import ElementLoader from '../common/ElementLoader';

const ProjectSettings = () => {
  const [settings, setSettings] = useState<ProjectSettingsType>({
    id: 0,
    deliveryOrderFee: 0,
    systemOrderFee: 0,
    circleRaduis: 0,
    distanceToAdd: 0,
    timeInMinutesToMakeTheCircleBigger: 0,
    maxDistanceToAdd: 0,
    maxMinutesToCancelOrderWaitingAProvider: 0,
    cancelOrderWhenNoProviderHasAllProducts: false,
    minOrderValue: 0,
    raduisForGetProducts: 0
  });
  const [isLoading , setIsLoading] = useState(false);
  const [isSubmitting , setIsSubmitting] = useState(false)



  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/backend/api/admin/system-settings`);
        if (!response.ok) {
          console.log(response)
          throw new Error('Failed to fetch settings');
        }
        const data = await response.json();
        setSettings(data.data);
      } catch (error) {
        console.error('Error fetching settings:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }
    ,[])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(settings) {
      const { name, value, type, checked } = e.target;
      setSettings(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : Number(value)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const response = await fetch(`/backend/api/admin/system-settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings)
      });

      if (response.ok) {
        toast.success('Settings updated successfully!');
      } else {
        throw new Error('Failed to update settings');
      }
    } catch (error) {
      toast.error('Failed to update settings');
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-sm bg-white dark:bg-gray-dark p-6 shadow-default">
      <h2 className="text-2xl font-bold text-dark dark:text-white mb-6">Project Settings</h2>
      {
        isLoading ? (
          <ElementLoader />
        ) : settings ? (
          <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="mb-2.5 block text-black dark:text-white">
              Delivery Order Fee
              <input
                type="number"
                name="deliveryOrderFee"
                value={settings.deliveryOrderFee}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </label>
          </div>

          <div>
            <label className="mb-2.5 block text-black dark:text-white">
              System Order Fee
              <input
                type="number"
                name="systemOrderFee"
                value={settings.systemOrderFee}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </label>
          </div>

          <div>
            <label className="mb-2.5 block text-black dark:text-white">
              Circle Radius
              <input
                type="number"
                name="circleRadius"
                value={settings.circleRaduis}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </label>
          </div>

          <div>
            <label className="mb-2.5 block text-black dark:text-white">
              How Much To Increase The Circle
              <input
                type="number"
                name="distanceToAdd"
                value={settings?.distanceToAdd}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </label>
          </div>

          <div>
            <label className="mb-2.5 block text-black dark:text-white">
              Max Distance To Add
              <input
                type="number"
                name="maxDistanceToAdd"
                value={settings.maxDistanceToAdd}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </label>
          </div>

          <div>
            <label className="mb-2.5 block text-black dark:text-white">
              Time In Minutes To Make The Circle Bigger
              <input
                type="number"
                name="timeInMinutesToMakeTheCircleBigger"
                value={settings.timeInMinutesToMakeTheCircleBigger}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </label>
          </div>



          <div>
            <label className="mb-2.5 block text-black dark:text-white">
              Max Minutes To Cancel Order Waiting A Provider
              <input
                type="number"
                name="maxMinutesToCancelOrderWaitingAProvider"
                value={settings.maxMinutesToCancelOrderWaitingAProvider}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </label>
          </div>

          <div>
            <label className="mb-2.5 block text-black dark:text-white">
              Min Order  Value
              <input
                type="number"
                name="minOrderValue"
                value={settings.minOrderValue}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </label>
          </div>

          <div>
            <label className="mb-2.5 block text-black dark:text-white">
              Raduis For Get Products
              <input
                type="number"
                name="raduisForGetProducts"
                value={settings.raduisForGetProducts}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </label>
          </div>

          <div className="col-span-1 md:col-span-2">
            <label className="flex items-center mb-2.5 text-black dark:text-white">
              <input
                type="checkbox"
                name="cancelOrderWhenNoProviderHasAllProducts"
                checked={settings.cancelOrderWhenNoProviderHasAllProducts}
                onChange={handleChange}
                className="mr-2"
              />
              Cancel Order When No Provider Has All Products
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="flex w-full justify-center rounded bg-primary p-3 font-medium text-white"
        >
          {isSubmitting ? (<ElementLoader color='white' />) : 'Submit'}
        </button>
      </form>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-2xl font-bold mb-4">No Settings Found</h1>
            <p className="text-gray-600">Please Check your internet connection</p>
          </div>
        )
      }
      
    </div>
  );
};

export default ProjectSettings;
