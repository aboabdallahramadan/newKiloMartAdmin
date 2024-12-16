"use client";
import { FreeDelivery as FreeDeliveryOffer } from "@/types/freeDelivery";
import { useEffect, useState } from "react";
import { BiStopCircle, BiCheckCircle } from "react-icons/bi";
import Loader from "../common/Loader";
import AddNewFreeDelivery from "./AddNewFreeDelivery";
import { toast } from "react-toastify";
import EditFreeDelivery from "./EditFreeDelivery";
import Image from "next/image";

const FreeDelivery = () => {
  const [freeDeliveryOffersData, setFreeDeliveryOffersData] = useState<FreeDeliveryOffer[]>([
    {
        id: 1,
        name: "First Offer",
        startDate: "2024-01-01",
        endDate: "2024-02-01",
        isActive: true
      },
      {
        id: 2,
        name: "First Offer",
        startDate: "2024-01-15",
        endDate: "2024-02-15",
        isActive: false
      },
      {
        id: 3,
        name: "First Offer",
        startDate: "2024-02-01",
        endDate: "2024-03-01",
        isActive: true
      }
  ]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchFreeDeliveryOffers = async () => {
      try {
        setLoading(true);
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/discountfreedelivery/list?page=${currentPage}&pageSize=${pageSize}`;
        console.log("Fetching from API URL:", apiUrl);
  
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
  
        if (data.status) {
          setFreeDeliveryOffersData(data.data.data);
          setTotalCount(data.data.totalCount);
        } else {
          console.error("Failed to fetch Free Delivery Offers:", data.message);
        }
      } catch (error) {
        console.error("Error fetching Free Delivery Offers:", error);
      } finally {
        setLoading(false);
      }
    };
  
    // fetchFreeDeliveryOffers();
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

  const handleFreezeFreeDelivery = async (freeDeliveryId: number) => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/discountfreedelivery/deactivate/${freeDeliveryId}`;
      const response = await fetch(apiUrl, {
        method: "PUT",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

        if (data.status) {
            // freeDelivery frozen successfully, update the freeDeliverysData state
            setFreeDeliveryOffersData((prevFreeDeliveryOffersData) =>
                prevFreeDeliveryOffersData.map((freeDelivery) =>
                    freeDelivery.id === freeDeliveryId ? { ...freeDelivery, isActive: !freeDelivery.isActive } : freeDelivery
            ));
            toast.success("freeDelivery frozen successfully");
        }
        else {
          console.error("Failed to freeze freeDelivery:", data.message);
          toast.error("Failed to freeze freeDelivery");
        }
    }
    catch (error) {
      console.error("Error freezing freeDelivery:", error);
      toast.error("Failed to freeze freeDelivery");
    }
  }

  const handleActivateFreeDelivery = async (freeDeliveryId: number) => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/discountfreeDelivery/activate/${freeDeliveryId}`;
      const response = await fetch(apiUrl, {
        method: "PUT",
      });

      if (!response.ok) {
        toast.error("Failed to freeze freeDelivery");
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

        if (data.status) {
            // freeDelivery frozen successfully, update the FreeDeliverysData state
            setFreeDeliveryOffersData((prevFreeDeliveryOffersData) =>
                prevFreeDeliveryOffersData.map((freeDelivery) =>
                    freeDelivery.id === freeDeliveryId ? { ...freeDelivery, isActive: !freeDelivery.isActive } : freeDelivery
            ));
            toast.success("FreeDelivery activated successfully");
        }
        else {
          console.error("Failed to activate FreeDelivery:", data.message);
          toast.error("Failed to activate FreeDelivery");
        }
    }
    catch (error) {
      console.error("Error freezing FreeDelivery:", error);
      toast.error("Failed to freeze FreeDelivery");
    }
  }
  return (
    <div>
      <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="w-full flex items-center justify-between px-4 py-6 md:px-6 xl:px-9">
          <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
            All FreeDeliverys
          </h4>
          <AddNewFreeDelivery setFreeDeliveryOffersData={setFreeDeliveryOffersData} />
        </div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <>
          {freeDeliveryOffersData.length > 0 ? (
            <>
              

              <div className="grid grid-cols-3 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-7 md:px-6 2xl:px-7.5">
                <div className="col-span-2 flex items-center">
                  <p className="font-medium">Name</p>
                </div>
                <div className="col-span-2 hidden sm:flex items-start flex-col">
                  <p className="font-medium">Start Date</p>
                </div>
                <div className="col-span-2 hidden sm:flex items-start flex-col">
                  <p className="font-medium">End Date</p>
                </div>
                <div className="col-span-1 flex items-center justify-end">
                  <p className="font-medium">Actions</p>
                </div>
              </div>

              {freeDeliveryOffersData.map((freeDelivery, key) => (
                <div
                  className="grid grid-cols-3 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-7 md:px-6 2xl:px-7.5"
                  key={key}
                >
                  <div className="col-span-2 flex items-center">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                        {freeDelivery.name}
                      </p>
                    </div>
                  </div>
                  
                  <div className="col-span-2 hidden sm:flex items-center">
                    <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                      {freeDelivery.startDate.substring(0, 10)}
                    </p>
                  </div>
                  <div className="col-span-2 hidden sm:flex items-center">
                    <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                      {freeDelivery.endDate.substring(0, 10)}
                    </p>
                  </div>
                  <div className="col-span-1 flex items-center justify-end space-x-3.5">
                    <EditFreeDelivery freeDelivery={freeDelivery} setFreeDeliveryOffersData={setFreeDeliveryOffersData} />
                    {
                      freeDelivery.isActive ? (
                        <button className="hover:text-primary" title="Freeze" onClick={() => handleFreezeFreeDelivery(freeDelivery.id)}>
                          <BiStopCircle />
                        </button>
                      ) : (
                        <button className="hover:text-primary" title="Activate" onClick={() => handleActivateFreeDelivery(freeDelivery.id)}>
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
            <div className="w-full flex justify-center items-center py-4">No Free Delivery offers found</div>
          )}
        </>
          
      )}
      </div>
    </div>
  );
};

export default FreeDelivery;