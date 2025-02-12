"use client";
import { OffersTable } from '@/types/offersTable';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ElementLoader from '../common/ElementLoader';

const ProductOffersTable = () => {
  const [offers, setOffers] = useState<OffersTable[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchOffers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/backend/api/admin-panel/product/offers-by-id?productId=${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product offers');
        }
        const data = await response.json();
        if (data.status) {
          setOffers(data.data);
        } else {
          setError(data.message || 'Failed to fetch product offers');
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOffers();
  }, []);

  return (
    <div className="p-4 md:p-6 w-full mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-dark dark:text-white">Product&apos;s Offers</h2>
        <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
          {offers.length} Active Offers
        </span>
      </div>
      {isLoading && <ElementLoader />}
      {error && <p className="text-red-600">{error}</p>}
      {!isLoading && !error && (
        <div className="bg-white dark:bg-gray-dark rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-full divide-y divide-gray-200 dark:divide-dark-3">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-dark dark:text-white">Provider Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-dark dark:text-white">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-dark dark:text-white">Quantity</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-dark dark:text-white">Discount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-dark-3">
                {offers.map((offer, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Link href={`/providers/${offer.providerId}`} className="text-sm font-medium text-primary hover:text-primary/80">
                          {offer.providerDisplayName}
                        </Link>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-dark dark:text-white">
                        {offer.price} SAR
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-dark dark:text-white">
                        {offer.quantity}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400">
                        {offer.offPercentage}% OFF
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductOffersTable;
