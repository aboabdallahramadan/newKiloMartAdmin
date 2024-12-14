"use client";
import React from 'react';
import Link from 'next/link';
import { Customer } from '@/types/customer';
import { FaEye, FaBan, FaCheck } from 'react-icons/fa';

const customers : Customer[] = [
  {
    id: 1,
    name: "John Smith",
    phoneNumber: "+966 50 123 4567",
    totalOrders: 25,
    isActive: true
  },
  {
    id: 2,
    name: "Sarah Johnson",
    phoneNumber: "+966 55 987 6543",
    totalOrders: 15,
    isActive: true
  },
  {
    id: 3,
    name: "Mohammed Ali",
    phoneNumber: "+966 54 456 7890",
    totalOrders: 42,
    isActive: false
  }
];

const AllCustomers = () => {
  return (
    <div className="py-4 md:py-6 w-full mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-dark dark:text-white">All Customers</h2>
        <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
          {customers.length} Customers
        </span>
      </div>

      <div className="bg-white dark:bg-gray-dark rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-full divide-y divide-gray-200 dark:divide-dark-3">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-2 py-4 text-left text-sm font-semibold text-dark dark:text-white">Customer Name</th>
                <th className="px-2 py-4 text-left text-sm font-semibold text-dark dark:text-white">Phone Number</th>
                <th className="px-2 py-4 hidden md:table-cell text-left text-sm font-semibold text-dark dark:text-white">Total Orders</th>
                <th className="px-2 py-4 hidden md:table-cell text-left text-sm font-semibold text-dark dark:text-white">Status</th>
                <th className="px-2 py-4 text-left text-sm font-semibold text-dark dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-dark-3">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-2 py-4">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-dark dark:text-white">
                        {customer.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-2 py-4">
                    <span className="text-sm text-dark dark:text-white">{customer.phoneNumber}</span>
                  </td>
                  <td className="px-2 py-4 hidden md:table-cell">
                    <span className="text-sm font-medium text-dark dark:text-white">{customer.totalOrders}</span>
                  </td>
                  <td className="px-2 py-4  hidden md:table-cell">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      customer.isActive 
                      ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400'
                      : 'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400'
                    }`}>
                      {customer.isActive ? 'Active' : 'Frozen'}
                    </span>
                  </td>
                  <td className="px-2 py-4">
                    <div className="flex items-center gap-3">
                      <Link 
                        href={`/customers/${customer.id}`}
                        className="hover:text-primary text-sm font-medium"
                      >
                        <FaEye />
                      </Link>
                      <button 
                        onClick={() => {}} 
                        className={`text-sm font-medium ${
                          customer.isActive 
                          ? ' hover:text-red-600' 
                          : ' hover:text-green-600'
                        }`}
                      >
                        {customer.isActive ? <FaBan /> : <FaCheck />}
                      </button>
                    </div>
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

export default AllCustomers;
