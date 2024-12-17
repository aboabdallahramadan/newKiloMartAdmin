"use client";
import React, { useState } from 'react';
import { ProjectSettings as ProjectSettingsType } from '@/types/projectSettings';
import { toast } from 'react-toastify';

const ProjectSettings = () => {
  const [settings, setSettings] = useState<ProjectSettingsType>({
    Id: 1,
    DeliveryOrderFee: 10,
    SystemOrderFee: 10,
    CancelOrderWhenNoProviderHasAllProducts: true,
    MinCircleRadius: 5,
    MaxCircleRadius: 25,
    TimeInMinutesToMakeTheCircleBigger: 5,
    HowMuchToIncreaseTheCircle: 10,
    MaxMinutesToCancelOrderWaitingAProvider: 20,
    MaxMinutesToCancelOrderWaitingADelivery: 20
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : Number(value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/settings`, {
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
    }
  };

  return (
    <div className="rounded-sm bg-white dark:bg-gray-dark p-6 shadow-default">
      <h2 className="text-2xl font-bold text-dark dark:text-white mb-6">Project Settings</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="mb-2.5 block text-black dark:text-white">
              Delivery Order Fee
              <input
                type="number"
                name="DeliveryOrderFee"
                value={settings.DeliveryOrderFee}
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
                name="SystemOrderFee"
                value={settings.SystemOrderFee}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </label>
          </div>

          <div>
            <label className="mb-2.5 block text-black dark:text-white">
              Min Circle Radius
              <input
                type="number"
                name="MinCircleRadius"
                value={settings.MinCircleRadius}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </label>
          </div>

          <div>
            <label className="mb-2.5 block text-black dark:text-white">
              Max Circle Radius
              <input
                type="number"
                name="MaxCircleRadius"
                value={settings.MaxCircleRadius}
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
                name="TimeInMinutesToMakeTheCircleBigger"
                value={settings.TimeInMinutesToMakeTheCircleBigger}
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
                name="HowMuchToIncreaseTheCircle"
                value={settings.HowMuchToIncreaseTheCircle}
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
                name="MaxMinutesToCancelOrderWaitingAProvider"
                value={settings.MaxMinutesToCancelOrderWaitingAProvider}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </label>
          </div>

          <div>
            <label className="mb-2.5 block text-black dark:text-white">
              Max Minutes To Cancel Order Waiting A Delivery
              <input
                type="number"
                name="MaxMinutesToCancelOrderWaitingADelivery"
                value={settings.MaxMinutesToCancelOrderWaitingADelivery}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </label>
          </div>

          

          <div className="col-span-2">
            <label className="flex items-center mb-2.5 text-black dark:text-white">
              <input
                type="checkbox"
                name="CancelOrderWhenNoProviderHasAllProducts"
                checked={settings.CancelOrderWhenNoProviderHasAllProducts}
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
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default ProjectSettings;
