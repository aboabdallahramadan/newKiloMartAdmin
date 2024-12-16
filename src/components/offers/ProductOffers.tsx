"use client";
import {Offer} from "@/types/offer";
import { useEffect, useState } from "react";
import { BiStopCircle, BiCheckCircle } from "react-icons/bi";
import Loader from "../common/Loader";
import AddNewOffer from "./AddNewOffer";
import { toast } from "react-toastify";
import EditOffer from "./EditOffer";
import Image from "next/image";

const ProductOffers = () => {
  const [offersData, setOffersData] = useState<Offer[]>([
    {
        id: 1,
        productName: "Premium Coffee",
        productId: 4,
        productImageUrl: "/images/product/product-01.png",
        value: 20,
        startDate: "2024-01-01",
        endDate: "2024-02-01",
        isActive: true
      },
      {
        id: 2,
        productName: "Organic Tea",
        productId: 4,
        productImageUrl: "/images/product/product-02.png",
        value: 15,
        startDate: "2024-01-15",
        endDate: "2024-02-15",
        isActive: false
      },
      {
        id: 3,
        productName: "Fresh Juice",
        productId: 4,
        productImageUrl: "/images/product/product-03.png",
        value: 25,
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
    const fetchOffers = async () => {
      try {
        setLoading(true);
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/discountoffer/list?page=${currentPage}&pageSize=${pageSize}`;
        console.log("Fetching from API URL:", apiUrl);
  
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
  
        if (data.status) {
          setOffersData(data.data.data);
          setTotalCount(data.data.totalCount);
        } else {
          console.error("Failed to fetch Offers:", data.message);
        }
      } catch (error) {
        console.error("Error fetching Offers:", error);
      } finally {
        setLoading(false);
      }
    };
  
    // fetchOffers();
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

  const handleFreezeOffer = async (offerId: number) => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/discountoffer/deactivate/${offerId}`;
      const response = await fetch(apiUrl, {
        method: "PUT",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

        if (data.status) {
            // offer frozen successfully, update the OffersData state
            setOffersData((prevOffersData) =>
                prevOffersData.map((offer) =>
                    offer.id === offerId ? { ...offer, isActive: !offer.isActive } : offer
            ));
            toast.success("offer frozen successfully");
        }
        else {
          console.error("Failed to freeze offer:", data.message);
          toast.error("Failed to freeze offer");
        }
    }
    catch (error) {
      console.error("Error freezing offer:", error);
      toast.error("Failed to freeze offer");
    }
  }

  const handleActivateOffer = async (offerId: number) => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/discountoffer/activate/${offerId}`;
      const response = await fetch(apiUrl, {
        method: "PUT",
      });

      if (!response.ok) {
        toast.error("Failed to freeze offer");
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

        if (data.status) {
            // offer frozen successfully, update the OffersData state
            setOffersData((prevOffersData) =>
                prevOffersData.map((offer) =>
                    offer.id === offerId ? { ...offer, isActive: !offer.isActive } : offer
            ));
            toast.success("Offer activated successfully");
        }
        else {
          console.error("Failed to activate offer:", data.message);
          toast.error("Failed to activate offer");
        }
    }
    catch (error) {
      console.error("Error freezing offer:", error);
      toast.error("Failed to freeze offer");
    }
  }
  return (
    <div>
      <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="w-full flex items-center justify-between px-4 py-6 md:px-6 xl:px-9">
          <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
            All Offers
          </h4>
          <AddNewOffer setOffersData={setOffersData} />
        </div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <>
          {offersData.length > 0 ? (
            <>
              

              <div className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-6 md:px-6 2xl:px-7.5">
                <div className="col-span-2 flex items-center">
                  <p className="font-medium">Product</p>
                </div>
                <div className="col-span-1 flex items-center">
                  <p className="font-medium">Value</p>
                </div>
                <div className="col-span-1 hidden sm:flex items-start flex-col">
                  <p className="font-medium">Start Date</p>
                </div>
                <div className="col-span-1 hidden sm:flex items-start flex-col">
                  <p className="font-medium">End Date</p>
                </div>
                <div className="col-span-1 flex items-center justify-end">
                  <p className="font-medium">Actions</p>
                </div>
              </div>

              {offersData.map((offer, key) => (
                <div
                  className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-6 md:px-6 2xl:px-7.5"
                  key={key}
                >
                  <div className="col-span-2 flex items-center">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        <div className="h-12.5 w-15 rounded-md">
                            <Image
                                src={offer.productImageUrl}
                                width={60}
                                height={50}
                                alt="Product"
                            />
                        </div>
                      <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                        {offer.productName}
                      </p>
                    </div>
                  </div>
                  <div className="col-span-1 flex items-center">
                    <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                      {offer.value}%
                    </p>
                  </div>
                  
                  <div className="col-span-1 hidden sm:flex items-center">
                    <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                      {offer.startDate.substring(0, 10)}
                    </p>
                  </div>
                  <div className="col-span-1 hidden sm:flex items-center">
                    <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                      {offer.endDate.substring(0, 10)}
                    </p>
                  </div>
                  <div className="col-span-1 flex items-center justify-end space-x-3.5">
                    <EditOffer offer={offer} setOffersData={setOffersData} />
                    {
                      offer.isActive ? (
                        <button className="hover:text-primary" title="Freeze" onClick={() => handleFreezeOffer(offer.id)}>
                          <BiStopCircle />
                        </button>
                      ) : (
                        <button className="hover:text-primary" title="Activate" onClick={() => handleActivateOffer(offer.id)}>
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
            <div className="w-full flex justify-center items-center py-4">No Offers found</div>
          )}
        </>
          
      )}
      </div>
    </div>
  );
};

export default ProductOffers;