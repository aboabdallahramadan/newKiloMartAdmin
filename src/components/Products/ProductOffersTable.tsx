"use client";
import { ProductOffer } from '@/types/productOffer';
import Link from 'next/link';
import React from 'react';

const offers : Omit<ProductOffer, "productId" | "productImageUrl" | "productIsActive" | "productDescription" | "productMeasurementUnit" | "productName" | "productOfferFromDate" | "productOfferIsActive" | "productProductCategory" | "productCategoryName">[]  = [
  {
    productOfferId: 1,
    productOfferProviderId: 4,
    productOfferProviderName: "Fresh Foods Market",
    productOfferPrice: 299.99,
    productOfferQuantity: 50,
    productOfferOffPercentage: 10
  },
  {
    productOfferId: 2,
    productOfferProviderId: 4,
    productOfferProviderName: "Organic Wholesalers",
    productOfferPrice: 275.50,
    productOfferQuantity: 100,
    productOfferOffPercentage: 15
  },
  {
    productOfferId: 3,
    productOfferProviderId: 4,
    productOfferProviderName: "Metro Supplies",
    productOfferPrice: 289.99,
    productOfferQuantity: 75,
    productOfferOffPercentage: 12
  },
  {
    productOfferId: 4,
    productOfferProviderId: 4,
    productOfferProviderName: "Global Distributors",
    productOfferPrice: 265.00,
    productOfferQuantity: 200,
    productOfferOffPercentage: 20
  },
  {
    productOfferId: 5,
    productOfferProviderId: 4,
    productOfferProviderName: "Local Farmers Co-op",
    productOfferPrice: 295.00,
    productOfferQuantity: 25,
    productOfferOffPercentage: 5
  }
];

const ProductOffersTable = () => {
    return (
      <div className="p-4 md:p-6 w-full mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-dark dark:text-white">Product's Offers</h2>
          <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
            {offers.length} Active Offers
          </span>
        </div>
      
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
                        {offers.map((offer) => (
                            <tr key={offer.productOfferId} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <Link href={`/providers/${offer.productOfferProviderId}`} className="text-sm font-medium text-primary hover:text-primary/80">
                                            {offer.productOfferProviderName}
                                        </Link>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm font-semibold text-dark dark:text-white">
                                        {offer.productOfferPrice} RS
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm text-dark dark:text-white">
                                        {offer.productOfferQuantity} units
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400">
                                        {offer.productOfferOffPercentage}% OFF
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    );
};

export default ProductOffersTable;
