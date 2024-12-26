"use client";
import { Provider } from "@/types/provider";
import { useEffect, useState } from "react";
import Loader from "../common/Loader";
import { FaEye } from "react-icons/fa";
import { BiCheckCircle, BiStopCircle } from "react-icons/bi";
import Link from "next/link";
import AddNewProvider from "./AddNewProvider";

const AllProviders = () => {
  const [providersData, setProvidersData] = useState<Omit<Provider, 'totalOrders' | 'totalProducts' | 'availableBalance' | 'totalBalance' | 'ownershipDocumentFile' | 'ownerNationalApprovalFile' | 'isEmailVerified'>[]>([
    {
      providerId: 1,
      userId: 101,
      displayName: "Fresh Foods Market",
      firstName: "John",
      secondName: "Doe",
      companyName: "Fresh Foods Ltd",
      nationalApprovalId: "FDA123456",
      ownerName: "John Doe",
      ownerNationalId: "ID123456789",
      email: "john@freshfoods.com",
      isActive: true
    },
    {
      providerId: 2,
      userId: 102,
      displayName: "Organic Grocers",
      firstName: "Jane",
      secondName: "Smith",
      companyName: "Organic Grocers Inc",
      nationalApprovalId: "FDA789012",
      ownerName: "Jane Smith",
      ownerNationalId: "ID987654321",
      email: "jane@organicgrocers.com",
      isActive: false
    },
    {
      providerId: 3,
      userId: 103,
      displayName: "Quality Goods Store",
      firstName: "Mike",
      secondName: "Johnson",
      companyName: "Quality Goods Ltd",
      nationalApprovalId: "FDA345678",
      ownerName: "Mike Johnson",
      ownerNationalId: "ID456789123",
      email: "mike@qualitygoods.com",
      isActive: true
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        setLoading(true);
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/provider/admin/list?page=${currentPage}&pageSize=${pageSize}`;
        console.log("Fetching from API URL:", apiUrl);
  
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
  
        if (data.status) {
          setProvidersData(data.data.data);
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
  
    // fetchProviders();
  }, [currentPage, pageSize]);

  const totalPages = Math.ceil(totalCount / pageSize);

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
      <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="w-full flex items-center justify-between px-4 py-6 md:px-6 xl:px-9">
          <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
            All Providers
          </h4>
          <AddNewProvider/>
        </div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
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
                      24
                    </p>
                  </div>
                  <div className="col-span-1 hidden sm:flex items-center">
                    <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                      10
                    </p>
                  </div>
                  <div className="col-span-1 flex items-center">
                    <p className="text-body-sm font-medium text-green">
                      100RS
                      <br />
                      50RS
                    </p>
                  </div>
                  <div className="col-span-1 flex items-center justify-end space-x-3.5">
                    <Link href={`/providers/${provider.providerId}`} className="hover:text-primary" title="view">
                      <FaEye />
                    </Link>
                    {
                      provider.isActive ? (
                        <button className="hover:text-primary" title="Freeze">
                          <BiStopCircle />
                        </button>
                      ) : (
                        <button className="hover:text-primary" title="Activate">
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
                  className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
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