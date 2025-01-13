"use client";
import { Location } from "@/types/location"
import React, { useState } from 'react'

const LocationsTable = () => {
    const [locations, setLocations] = useState<Omit<Location , "userId" | "userName">[]>([
        {
          id: 1,
          name: "home",
          type: "Apartment",
          buildingNumber: "123",
          apartmentNumber: "456",
          floorNumber: "7",
          streetName: "Al-Riyadh",
          phoneNumber: "+966512345678",
          mapDetails: {
            latitude: 24.743752042257807,
            longitude: 46.65313878798754,
          }
        },
        {
            id: 2,
            name: "home",
            type: "Apartment",
            buildingNumber: "123",
            apartmentNumber: "456",
            floorNumber: "7",
            streetName: "Al-Riyadh",
            phoneNumber: "+966512345678",
            mapDetails: {
              latitude: 24.872622193731775,
              longitude: 41.19193667057781
            }
          },
          {
            id: 3,
            name: "home",
            type: "Apartment",
            buildingNumber: "123",
            apartmentNumber: "456",
            floorNumber: "7",
            streetName: "Al-Riyadh",
            phoneNumber: "+966512345678",
            mapDetails: {
              latitude: 24.233079626757707,
              longitude: 46.61918265698761,
            }
          },
          {
            id: 4,
            name: "home",
            type: "Apartment",
            buildingNumber: "123",
            apartmentNumber: "456",
            floorNumber: "7",
            streetName: "Al-Riyadh",
            phoneNumber: "+966512345678",
            mapDetails: {
              latitude: 25.230921977262206,
              longitude: 47.45414357797373,
            }
          },
          {
            id: 5,
            name: "home",
            type: "Apartment",
            buildingNumber: "123",
            apartmentNumber: "456",
            floorNumber: "7",
            streetName: "Al-Riyadh",
            phoneNumber: "+966512345678",
            mapDetails: {
              latitude: 24.55718835750745,
              longitude: 46.618417808853586,
            }
          }
      ]);

    return (
        <div className="overflow-x-auto shadow-md rounded-lg">
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
                        <tr key={location.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{location.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{location.type}</td>
                            <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                                {`Building ${location.buildingNumber}, Floor ${location.floorNumber}, Apt ${location.apartmentNumber}, ${location.streetName}`}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{location.phoneNumber}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default LocationsTable
