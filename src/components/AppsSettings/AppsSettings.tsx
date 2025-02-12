"use client";
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import ElementLoader from '../common/ElementLoader';
import { AppsSettings as SettingsData } from '@/types/appsSettings';

const AppsSettings = () => {
  const [settings, setSettings] = useState<SettingsData>({
    id: 0,
    customerAppMinimumBuildNumberAndroid: 0,
    customerAppMinimumBuildNumberIos: 0,
    customerAppUrlAndroid: 'string',
    customerAppUrlIos: 'string',
    providerAppMinimumBuildNumberAndroid: 0,
    providerAppMinimumBuildNumberIos: 0,
    providerAppUrlAndroid: 'string',
    providerAppUrlIos: 'string',
    deliveryAppMinimumBuildNumberAndroid: 0,
    deliveryAppMinimumBuildNumberIos: 0,
    deliveryAppUrlAndroid: 'string',
    deliveryAppUrlIos: 'string'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/backend/api/admin/mobile-app-configuration`);
        if (!response.ok) {
          console.log(response);
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
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const response = await fetch(`/backend/api/admin/mobile-app-configuration`, {
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
      <h2 className="text-2xl font-bold text-dark dark:text-white mb-6">Apps Settings</h2>
      {isLoading ? (
        <ElementLoader />
      ) : settings ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer App Settings */}
          <div>
            <h3 className="text-lg font-semibold text-dark dark:text-white mb-4">Customer App Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="mb-2.5 block text-black dark:text-white">
                  Customer App Minimum Build Number Android
                  <input
                    type="number"
                    name="customerAppMinimumBuildNumberAndroid"
                    value={settings.customerAppMinimumBuildNumberAndroid}
                    onChange={handleChange}
                    className="w-full rounded border border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </label>
              </div>
              <div>
                <label className="mb-2.5 block text-black dark:text-white">
                  Customer App Minimum Build Number Ios
                  <input
                    type="number"
                    name="customerAppMinimumBuildNumberIos"
                    value={settings.customerAppMinimumBuildNumberIos}
                    onChange={handleChange}
                    className="w-full rounded border border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </label>
              </div>
              <div>
                <label className="mb-2.5 block text-black dark:text-white">
                  Customer App Url Android
                  <input
                    type="text"
                    name="customerAppUrlAndroid"
                    value={settings.customerAppUrlAndroid}
                    onChange={handleChange}
                    className="w-full rounded border border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </label>
              </div>
              <div>
                <label className="mb-2.5 block text-black dark:text-white">
                  Customer App Url Ios
                  <input
                    type="text"
                    name="customerAppUrlIos"
                    value={settings.customerAppUrlIos}
                    onChange={handleChange}
                    className="w-full rounded border border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Provider App Settings */}
          <div>
            <h3 className="text-lg font-semibold text-dark dark:text-white mb-4">Provider App Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="mb-2.5 block text-black dark:text-white">
                  Provider App Minimum Build Number Android
                  <input
                    type="number"
                    name="providerAppMinimumBuildNumberAndroid"
                    value={settings.providerAppMinimumBuildNumberAndroid}
                    onChange={handleChange}
                    className="w-full rounded border border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </label>
              </div>
              <div>
                <label className="mb-2.5 block text-black dark:text-white">
                  Provider App Minimum Build Number Ios
                  <input
                    type="number"
                    name="providerAppMinimumBuildNumberIos"
                    value={settings.providerAppMinimumBuildNumberIos}
                    onChange={handleChange}
                    className="w-full rounded border border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </label>
              </div>
              <div>
                <label className="mb-2.5 block text-black dark:text-white">
                  Provider App Url Android
                  <input
                    type="text"
                    name="providerAppUrlAndroid"
                    value={settings.providerAppUrlAndroid}
                    onChange={handleChange}
                    className="w-full rounded border border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </label>
              </div>
              <div>
                <label className="mb-2.5 block text-black dark:text-white">
                  Provider App Url Ios
                  <input
                    type="text"
                    name="providerAppUrlIos"
                    value={settings.providerAppUrlIos}
                    onChange={handleChange}
                    className="w-full rounded border border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Delivery App Settings */}
          <div>
            <h3 className="text-lg font-semibold text-dark dark:text-white mb-4">Delivery App Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="mb-2.5 block text-black dark:text-white">
                  Delivery App Minimum Build Number Android
                  <input
                    type="number"
                    name="deliveryAppMinimumBuildNumberAndroid"
                    value={settings.deliveryAppMinimumBuildNumberAndroid}
                    onChange={handleChange}
                    className="w-full rounded border border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </label>
              </div>
              <div>
                <label className="mb-2.5 block text-black dark:text-white">
                  Delivery App Minimum Build Number Ios
                  <input
                    type="number"
                    name="deliveryAppMinimumBuildNumberIos"
                    value={settings.deliveryAppMinimumBuildNumberIos}
                    onChange={handleChange}
                    className="w-full rounded border border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </label>
              </div>
              <div>
                <label className="mb-2.5 block text-black dark:text-white">
                  Delivery App Url Android
                  <input
                    type="text"
                    name="deliveryAppUrlAndroid"
                    value={settings.deliveryAppUrlAndroid}
                    onChange={handleChange}
                    className="w-full rounded border border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </label>
              </div>
              <div>
                <label className="mb-2.5 block text-black dark:text-white">
                  Delivery App Url Ios
                  <input
                    type="text"
                    name="deliveryAppUrlIos"
                    value={settings.deliveryAppUrlIos}
                    onChange={handleChange}
                    className="w-full rounded border border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </label>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="flex w-full justify-center rounded bg-primary p-3 font-medium text-white"
          >
            {isSubmitting ? (<ElementLoader color="white" />) : 'Submit'}
          </button>
        </form>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-2xl font-bold mb-4">No Settings Found</h1>
          <p className="text-gray-600">Please Check your internet connection</p>
        </div>
      )}
    </div>
  );
};

export default AppsSettings;
