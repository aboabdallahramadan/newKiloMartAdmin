"use client";
import { accountRequest } from "@/types/accountRequest";
import { useEffect, useState } from "react";
import Loader from "../common/Loader";
import { BiCheckCircle, BiTrash } from "react-icons/bi";

const AccountsRequests = () => {
  const [requestsData, setRequestsData] = useState<accountRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        setLoading(true);
        // const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/provider/admin/list?page=${currentPage}&pageSize=${pageSize}`;
        // console.log("Fetching from API URL:", apiUrl);
  
        // const response = await fetch(apiUrl);
        // if (!response.ok) {
        //   throw new Error(`HTTP error! status: ${response.status}`);
        // }
  
        // const data = await response.json();
  
        // if (data.status) {
        //   setProvidersData(data.data.data);
        //   setTotalCount(data.data.totalCount);
        // } else {
        //   console.error("Failed to fetch providers:", data.message);
        // }
        setRequestsData([
          {
            id: 1,
            name: "Mohammad",
            phone: "+96699999999",
            date: new Date().toLocaleDateString()
          },
          {
            id: 6,
            name: "Mohammad",
            phone: "+96699999999",
            date: new Date().toLocaleDateString()
          },
          {
            id: 7,
            name: "Mohammad",
            phone: "+96699999999",
            date: new Date().toLocaleDateString()
          },
          {
            id: 8,
            name: "Mohammad",
            phone: "+96699999999",
            date: new Date().toLocaleDateString()
          },
          {
            id: 9,
            name: "Mohammad",
            phone: "+96699999999",
            date: new Date().toLocaleDateString()
          }
        ])
        setTotalCount(requestsData.length);
      } catch (error) {
        console.error("Error fetching providers:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProviders();
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
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <>
          {requestsData.length > 0 ? (
            <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
              <div className="px-4 py-6 md:px-6 xl:px-9">
              <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
                New Provider Requests
              </h4>
              </div>

              <div className="grid grid-cols-5 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-6 md:px-6 2xl:px-7.5">
                <div className="col-span-2 flex items-center">
                  <p className="font-medium">Name</p>
                </div>
                <div className="col-span-2 flex items-center">
                  <p className="font-medium">Phone Number</p>
                </div>
                <div className="col-span-1 hidden items-center sm:flex">
                  <p className="font-medium">Date</p>
                </div>
                <div className="col-span-1 flex items-center justify-end">
                  <p className="font-medium">Actions</p>
                </div>
              </div>

              {requestsData.map((request, key) => (
                <div
                  className="grid grid-cols-5 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-6 md:px-6 2xl:px-7.5"
                  key={key}
                >
                  <div className="col-span-2 flex items-center">
                    <div className="flex gap-4 items-center">
                      <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                        {request.name}
                      </p>
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                      {request.phone}
                    </p>
                  </div>
                  <div className="col-span-1 hidden items-center sm:flex">
                    <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                      {request.date}
                    </p>
                  </div>
                  <div className="col-span-1 flex items-center justify-end space-x-3.5">
                      <button className="hover:text-primary" title="Activate">
                        <BiCheckCircle />
                      </button>
                      <button className="hover:text-rose-600" title="Delete">
                        <BiTrash />
                      </button>
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
                <span className="flex items-center">
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
            </div>
          ) : (
            <div>No providers found</div>
          )}
        </>
          
      )}
    </div>
  );
};

export default AccountsRequests;