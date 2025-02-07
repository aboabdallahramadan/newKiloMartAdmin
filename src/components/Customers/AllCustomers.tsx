"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Customer } from "@/types/customer";
import { FaEye, FaBan, FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";

const AllCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchCustomers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/backend/api/admin-panel/customers/paginated?page=${currentPage}&pageSize=${pageSize}&term=${searchTerm}`
        );
        const data = await response.json();
        if (data.status) {
          setCustomers(data.data.customers);
          setTotalCustomers(data.data.totalCount);
        } else {
          console.error("Error fetching customers:", data.message);
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
      setIsLoading(false);
    };
    fetchCustomers();
  }, [currentPage, pageSize, searchTerm]);

  const totalPages = Math.ceil(totalCustomers / pageSize);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };


  const handleFreeze = async (email: string) => {
      try {
        const apiUrl = `/backend/api/user/admin/deactivate/email`;
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(email),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
  
        if (data.status) {
          setCustomers((prevCustomer) =>
            prevCustomer?.map((customer) =>
              customer.email === email ? { ...customer, isActive: false } : customer
            )
          );
          toast.success("Customer has been frozen successfully");
        } else {
          console.error("Failed to freeze customer:", data.message);
          toast.error("Failed to freeze customer");
        }}
        catch (error) {
        console.error("Error freezing customer:", error);
        toast.error("Failed to freeze customer");
      }
    };
  
  
    const handleActivate = async (email: string) => {
      try {
        const apiUrl = `/backend/api/user/admin/activate/email`;
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(email),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
  
        if (data.status) {
          setCustomers((prevCustomer) =>
            prevCustomer.map((customer) =>
              customer.email === email ? { ...customer, isActive: true } : customer
            )
          );
          toast.success("Customer has been activated successfully");
        } else {
          console.error("Failed to activate customer:", data.message);
          toast.error("Failed to activate customer");
        }}
        catch (error) {
        console.error("Error activating customer:", error);
        toast.error("Failed to activate customer");
      }
    };

  return (
    <div className="py-4 md:py-6 w-full mx-auto">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by name or phone..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="flex-1 md:w-1/3 px-4 py-2 rounded-lg border border-dark-3 bg-transparent outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2"
        />

        <button
          className="ml-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-all"
          onClick={() => setSearchTerm(searchInput)}
        >
          Search
        </button>

      </div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-dark dark:text-white">
          All Customers
        </h2>
        <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
          {totalCustomers} Customers
        </span>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="bg-white dark:bg-gray-dark rounded-lg shadow-md overflow-hidden">
          {
            customers && customers.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full min-w-full divide-y divide-gray-200 dark:divide-dark-3">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th className="px-2 py-4 text-left text-sm font-semibold text-dark dark:text-white">
                        Customer Name
                      </th>
                      <th className="px-2 py-4 text-left text-sm font-semibold text-dark dark:text-white">
                        Phone Number
                      </th>
                      <th className="px-2 py-4 hidden md:table-cell text-left text-sm font-semibold text-dark dark:text-white">
                        Status
                      </th>
                      <th className="px-2 py-4 text-left text-sm font-semibold text-dark dark:text-white">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-dark-3">
                    {customers.map((customer) => (
                      <tr
                        key={customer.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <td className="px-2 py-4">
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-dark dark:text-white">
                              {customer.displayName}
                            </span>
                          </div>
                        </td>
                        <td className="px-2 py-4">
                          <span className="text-sm text-dark dark:text-white">
                            {customer.email}
                          </span>
                        </td>
                        <td className="px-2 py-4 hidden md:table-cell">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                              customer.isActive
                                ? "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400"
                                : "bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400"
                            }`}
                          >
                            {customer.isActive ? "Active" : "Frozen"}
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
                                  ? "hover:text-red-600"
                                  : "hover:text-green-600"
                              }`}
                            >
                              {customer.isActive ? <FaBan onClick={() => handleFreeze(customer.email)} /> : <FaCheck onClick={() => handleActivate(customer.email)}/>}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between p-4">
                <button
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-sm text-dark dark:text-white">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
            ) : (
              <>
              <p>No Customers Found</p>
              </>
            )
          }
          
          
        </div>
      )}
    </div>
  );
};

export default AllCustomers;
