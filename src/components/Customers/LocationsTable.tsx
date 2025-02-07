"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Location } from '@/types/customerDetails';
import ElementLoader from '../common/ElementLoader';

const LocationsTable = () => {
  const { id } = useParams();
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading , setIsLoading] = useState(false);

  useEffect(() => {
    const fetchLocations = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/backend/api/admin-panel/customer-by-id?customerId=${id}`);
        const result = await response.json();
        setLocations(result.data.locations || []);
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLocations();
  }, []);


  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      {isLoading ? (
        <ElementLoader />
      )
      : (
        <>
        {
          locations ? (
            <table className="min-w-full bg-white dark:bg-gray-800">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Address</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Phone</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                {locations.map((location) => (
                  <tr key={location.locationId} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{location.locationName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{location.locationDetailsBuildingType}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                      {`Building ${location.locationDetailsBuildingNumber}, Floor ${location.locationDetailsFloorNumber}, Apt ${location.locationDetailsApartmentNumber}, ${location.locationDetailsStreetNumber}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{location.locationDetailsPhoneNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No Locations Found</p>
          )
        }
        </>
      )
    }
      
    </div>
  );
};

export default LocationsTable;
