"use client";
import { Provider } from "@/types/provider";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { BiCheckCircle, BiStopCircle } from "react-icons/bi";
import Link from "next/link";
import AddNewProvider from "./AddNewProvider";
import ElementLoader from "../common/ElementLoader";
import { toast } from "react-toastify";

const AllProviders = () => {
  const [providersData, setProvidersData] = useState<Omit<Provider,'ownershipDocumentFile' | 'ownerNationalApprovalFile' | 'isEmailVerified'>[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        setLoading(true);
        const apiUrl = `/backend/api/admin-panel/providers/paginated-by-search-term?term=${searchTerm}&page=${currentPage}&pageSize=${pageSize}`;
  
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
  
        if (data.status) {
          setProvidersData(data.data.providers);
          setTotalCount(data.data.totalCount);
        } else {
          console.error("Failed to fetch providers:", data.message);
        }
      } catch (error) {
        console.error("Error fetching providers:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProviders();
  }, [currentPage, pageSize, searchTerm]);

  const totalPages = Math.ceil(totalCount / pageSize);


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
        setProvidersData((prevProvidersData) =>
          prevProvidersData.map((provider) =>
            provider.email === email ? { ...provider, isActive: false } : provider
          )
        );
        toast.success("Provider has been frozen successfully");
      } else {
        console.error("Failed to freeze provider:", data.message);
        toast.error("Failed to freeze provider");
      }}
      catch (error) {
      console.error("Error freezing provider:", error);
      toast.error("Failed to freeze provider");
    }
  };


  const handleActivate = async (email: string) => {
    try {
      const apiUrl = `/backend/api/user/admin/activate/email`;
      const response = await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.status) {
        setProvidersData((prevProvidersData) =>
          prevProvidersData.map((provider) =>
            provider.email === email ? { ...provider, isActive: true } : provider
          )
        );
        toast.success("Provider has been activated successfully");
      } else {
        console.error("Failed to activate provider:", data.message);
        toast.error("Failed to activate provider");
      }}
      catch (error) {
      console.error("Error activating provider:", error);
      toast.error("Failed to activate provider");
    }
  };



  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div>
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
      <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="w-full flex items-center justify-between px-4 py-6 md:px-6 xl:px-9">
          <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
            All Providers
          </h4>
          <AddNewProvider/>
        </div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ElementLoader size={20} />
        </div>
      ) : (
        <>
          {providersData.length > 0 ? (
            <>
              

              <div className="grid grid-cols-5 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
                <div className="col-span-2 flex items-center">
                  <p className="font-medium">Display Name</p>
                </div>
                <div className="col-span-2 hidden items-center sm:flex">
                  <p className="font-medium">Phone Number</p>
                </div>
                <div className="col-span-1 flex items-center">
                  <p className="font-medium">Orders</p>
                </div>
                <div className="col-span-1 hidden sm:flex items-center">
                  <p className="font-medium">Products</p>
                </div>
                <div className="col-span-1 flex items-start flex-col">
                  <p className="font-medium">Total Balance</p>
                  <p className="font-medium">Available Balance</p>
                </div>
                <div className="col-span-1 flex items-center justify-end">
                  <p className="font-medium">Actions</p>
                </div>
              </div>

              {providersData.map((provider, key) => (
                <div
                  className="grid grid-cols-5 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5"
                  key={key}
                >
                  <div className="col-span-2 flex items-center">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                        {provider.displayName}
                      </p>
                    </div>
                  </div>
                  <div className="col-span-2 hidden items-center sm:flex">
                    <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                      {provider.email}
                    </p>
                  </div>
                  <div className="col-span-1 flex items-center">
                    <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                      {provider.totalOrders}
                    </p>
                  </div>
                  <div className="col-span-1 hidden sm:flex items-center">
                    <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                      {provider.totalProducts}
                    </p>
                  </div>
                  <div className="col-span-1 flex items-center">
                    <p className="text-body-sm font-medium text-green">
                      {provider.totalBalnace} SAR
                      <br />
                      {provider.availableBalnace} SAR
                    </p>
                  </div>
                  <div className="col-span-1 flex items-center justify-end space-x-3.5">
                    <Link href={`/providers/${provider.providerId}`} className="hover:text-primary" title="view">
                      <FaEye />
                    </Link>
                    {
                      provider.isActive ? (
                        <button className="hover:text-primary" title="Freeze" onClick={() => handleFreeze(provider.email)}>
                          <BiStopCircle />
                        </button>
                      ) : (
                        <button className="hover:text-primary" title="Activate" onClick={() => handleActivate(provider.email)}>
                          <BiCheckCircle />
                        </button>
                      )
                    }
                  </div>
                </div>
              ))}

              <div className="flex justify-between px-4 py-4.5">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-300 rounded text-black disabled:opacity-50"
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gray-300 rounded text-black disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <div className="w-full flex justify-center items-center py-4">No providers found</div>
          )}
        </>
          
      )}
      </div>
    </div>
  );
};

export default AllProviders;