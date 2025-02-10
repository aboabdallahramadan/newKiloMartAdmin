"use client";
import { FreeDelivery as FreeDeliveryOffer } from "@/types/freeDelivery";
import { useEffect, useState } from "react";
import { BiStopCircle, BiCheckCircle, BiTrash } from "react-icons/bi";
import Loader from "../common/Loader";
import AddNewFreeDelivery from "./AddNewFreeDelivery";
import { toast } from "react-toastify";
import EditFreeDelivery from "./EditFreeDelivery";
import Image from "next/image";
import ElementLoader from "../common/ElementLoader";

const FreeDelivery = () => {
  const [freeDeliveryOffersData, setFreeDeliveryOffersData] = useState<FreeDeliveryOffer[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFreeDeliveryOffers = async () => {
      try {
        setLoading(true);
        const apiUrl = `/backend/api/driverfreefee/admin/all`;
        console.log("Fetching from API URL:", apiUrl);
  
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
  
        if (data.status) {
          setFreeDeliveryOffersData(data.data);
        } else {
          console.error("Failed to fetch Free Delivery Offers:", data.message);
        }
      } catch (error) {
        console.error("Error fetching Free Delivery Offers:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchFreeDeliveryOffers();
  }, []);

  const handleFreezeFreeDelivery = async (freeDeliveryId: number) => {
    try {
      const apiUrl = `/backend/api/driverfreefee/admin/deactivate/${freeDeliveryId}`;
      const response = await fetch(apiUrl, {
        method: "PUT",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.status) {
        // Free delivery frozen successfully, update the freeDeliveryOffersData state
        setFreeDeliveryOffersData((prevOffers) =>
          prevOffers.map((offer) =>
            offer.id === freeDeliveryId ? { ...offer, isActive: !offer.isActive } : offer
          )
        );
        toast.success("Free Delivery frozen successfully");
      } else {
        console.error("Failed to freeze Free Delivery:", data.message);
        toast.error("Failed to freeze Free Delivery");
      }
    } catch (error) {
      console.error("Error freezing Free Delivery:", error);
      toast.error("Failed to freeze Free Delivery");
    }
  };

  const handleActivateFreeDelivery = async (freeDriver: FreeDeliveryOffer) => {
    try {
      const apiUrl = `/backend/api/driverfreefee/admin/edit/${freeDriver.id}`;
      const response = await fetch(apiUrl, {
        method: "PUT",
        body: JSON.stringify({
          startDate: freeDriver.startDate,
          endDate: freeDriver.endDate,
          isActive: true,
        }),
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (!response.ok) {
        toast.error("Failed to activate freeDelivery");
        console.log(await response.json());
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.status) {
        // Free delivery activated successfully, update the freeDeliveryOffersData state
        setFreeDeliveryOffersData((prevOffers) =>
          prevOffers.map((offer) =>
            offer.id === freeDriver.id ? { ...offer, isActive: !offer.isActive } : offer
          )
        );
        toast.success("Free Delivery activated successfully");
      } else {
        console.error("Failed to activate Free Delivery:", data.message);
        toast.error("Failed to activate Free Delivery");
      }
    } catch (error) {
      console.error("Error activating Free Delivery:", error);
      toast.error("Failed to activate Free Delivery");
    }
  };

  const handleDeleteFreeDelivery = async (freeDeliveryId: number) => {
    try {
      const apiUrl = `/backend/api/driverfreefee/admin/delete/${freeDeliveryId}`;
      const response = await fetch(apiUrl, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.status) {
        // Remove the deleted offer from state
        setFreeDeliveryOffersData((prevOffers) =>
          prevOffers.filter((offer) => offer.id !== freeDeliveryId)
        );
        toast.success("Free Delivery deleted successfully");
      } else {
        console.error("Failed to delete Free Delivery:", data.message);
        toast.error("Failed to delete Free Delivery");
      }
    } catch (error) {
      console.error("Error deleting Free Delivery:", error);
      toast.error("Failed to delete Free Delivery");
    }
  };

  return (
    <div>
      <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="w-full flex items-center justify-between px-4 py-6 md:px-6 xl:px-9">
          <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
            All Free delivery
          </h4>
          <AddNewFreeDelivery setFreeDeliveryOffersData={setFreeDeliveryOffersData} />
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <ElementLoader />
          </div>
        ) : (
          <>
            {freeDeliveryOffersData && freeDeliveryOffersData.length > 0 ? (
              <>
                <div className="grid grid-cols-3 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-5 md:px-6 2xl:px-7.5">
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
                    className="grid grid-cols-3 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-5 md:px-6 2xl:px-7.5"
                    key={key}
                  >
                    <div className="col-span-2 hidden sm:flex items-center">
                      <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                        {new Date(freeDelivery.startDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="col-span-2 hidden sm:flex items-center">
                      <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                        {new Date(freeDelivery.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="col-span-1 flex items-center justify-end space-x-3.5">
                      <EditFreeDelivery freeDelivery={freeDelivery} setFreeDeliveryOffersData={setFreeDeliveryOffersData} />
                      {freeDelivery.isActive ? (
                        <button className="hover:text-primary" title="Freeze" onClick={() => handleFreezeFreeDelivery(freeDelivery.id)}>
                          <BiStopCircle />
                        </button>
                      ) : (
                        <button className="hover:text-primary" title="Activate" onClick={() => handleActivateFreeDelivery(freeDelivery)}>
                          <BiCheckCircle />
                        </button>
                      )}
                      <button className="hover:text-red-500" title="Delete" onClick={() => handleDeleteFreeDelivery(freeDelivery.id)}>
                        <BiTrash />
                      </button>
                    </div>
                  </div>
                ))}
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
