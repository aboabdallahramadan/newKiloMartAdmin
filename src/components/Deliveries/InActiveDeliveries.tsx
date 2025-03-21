"use client";
import { DeliveryAccountRequest } from "@/types/deliveryAccountRequests";
import { useEffect, useState } from "react";
import Loader from "../common/Loader";
import DeliveryDetailsModal from "./DeliveryDetailsModal";
import { AiOutlineEye } from "react-icons/ai";
import { BiCheckCircle } from "react-icons/bi";
import { toast } from "react-toastify";


const InActiveDeliveries = () => {
    const [requestsData, setRequestsData] = useState<DeliveryAccountRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<DeliveryAccountRequest | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        setLoading(true);
        const apiUrl = `/backend/api/admin-panel/deliveries/paginated-by-term?isActive=false&page=${currentPage}&pageSize=${pageSize}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
  
        if (data.status) {
          setRequestsData(data.data.deliveries);
          setTotalCount(data.data.totalCount);
        } else {
          console.error("Failed to fetch deliveries:", data.message);
        }
      } catch (error) {
        console.error("Error fetching deliveries:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchDeliveries();
  }, [currentPage, pageSize]);

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
        setRequestsData((prevRequestsData) =>
          prevRequestsData.filter((delivery) => delivery.email !== email)
        );
        toast.success("Delivery has been activated successfully");
      } else {
        console.error("Failed to activate delivery:", data.message);
        toast.error("Failed to activate delivery");
      }}
      catch (error) {
      console.error("Error activating delivery:", error);
      toast.error("Failed to activate delivery");
    }
  };

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
                Inactive Deliveries
              </h4>
              </div>

              <div className="grid grid-cols-5 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-5 md:px-6 2xl:px-7.5">
                <div className="col-span-2 flex items-center">
                  <p className="font-medium">Name</p>
                </div>
                <div className="col-span-2 flex items-center">
                  <p className="font-medium">Phone Number</p>
                </div>
                <div className="col-span-1 flex items-center justify-end">
                  <p className="font-medium">Actions</p>
                </div>
              </div>

              {requestsData.map((request, key) => (
                <div
                  className="grid grid-cols-5 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-5 md:px-6 2xl:px-7.5"
                  key={key}
                >
                  <div className="col-span-2 flex items-center">
                    <div className="flex gap-4 items-center">
                      <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                        {request.displayName}
                      </p>
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <p className="text-body-sm font-medium text-dark dark:text-dark-6 break-all pr-4">
                      {request.email}
                    </p>
                  </div>
                  <div className="col-span-1 flex items-center justify-end space-x-1.5 sm:space-x-3">
                    <button className="hover:text-primary" title="Activate" onClick={() => handleActivate(request.email)}>
                        <BiCheckCircle />
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
            <div>No inactive deliveries found</div>
          )}
        </>

          
      )}
      {selectedRequest && (
        <DeliveryDetailsModal 
            deliveryId={selectedRequest.deliveryId}
            deliveryEmail={selectedRequest.email}
            onClose={() => setSelectedRequest(null)}
        />
    )}
    </div>
  );
};

export default InActiveDeliveries;