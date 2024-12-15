"use client";
import {Code} from "@/types/code";
import { useEffect, useState } from "react";
import { BiStopCircle, BiCheckCircle } from "react-icons/bi";
import Loader from "../common/Loader";
import AddNewCode from "./AddNewCode";
import { toast } from "react-toastify";
import EditCode from "./EditCode";

const DiscountCodes = () => {
  const [codesData, setCodesData] = useState<Code[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchCodes = async () => {
      try {
        setLoading(true);
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/discountcode/list?page=${currentPage}&pageSize=${pageSize}`;
        console.log("Fetching from API URL:", apiUrl);
  
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
  
        if (data.status) {
          setCodesData(data.data.data);
          setTotalCount(data.data.totalCount);
        } else {
          console.error("Failed to fetch Codes:", data.message);
        }
      } catch (error) {
        console.error("Error fetching Codes:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCodes();
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

  const handleFreezeCode = async (codeId: number) => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/discountcode/deactivate/${codeId}`;
      const response = await fetch(apiUrl, {
        method: "PUT",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

        if (data.status) {
            // Code frozen successfully, update the codesData state
            setCodesData((prevCodesData) =>
                prevCodesData.map((code) =>
                    code.id === codeId ? { ...code, isActive: !code.isActive } : code
            ));
            toast.success("Code frozen successfully");
        }
        else {
          console.error("Failed to freeze code:", data.message);
          toast.error("Failed to freeze code");
        }
    }
    catch (error) {
      console.error("Error freezing code:", error);
      toast.error("Failed to freeze code");
    }
  }

  const handleActivateCode = async (codeId: number) => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/discountcode/activate/${codeId}`;
      const response = await fetch(apiUrl, {
        method: "PUT",
      });

      if (!response.ok) {
        toast.error("Failed to freeze code");
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

        if (data.status) {
            // Code frozen successfully, update the codesData state
            setCodesData((prevCodesData) =>
                prevCodesData.map((code) =>
                    code.id === codeId ? { ...code, isActive: !code.isActive } : code
            ));
            toast.success("Code activated successfully");
        }
        else {
          console.error("Failed to activate code:", data.message);
          toast.error("Failed to activate code");
        }
    }
    catch (error) {
      console.error("Error freezing code:", error);
      toast.error("Failed to freeze code");
    }
  }
  return (
    <div>
      <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="w-full flex items-center justify-between px-4 py-6 md:px-6 xl:px-9">
          <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
            All Codes
          </h4>
          <AddNewCode setCodesData={setCodesData} />
        </div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <>
          {codesData.length > 0 ? (
            <>
              

              <div className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
                <div className="col-span-1 flex items-center">
                  <p className="font-medium">Code</p>
                </div>
                <div className="col-span-2 hidden items-center sm:flex">
                  <p className="font-medium">Description</p>
                </div>
                <div className="col-span-1 flex items-center">
                  <p className="font-medium">Type</p>
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

              {codesData.map((code, key) => (
                <div
                  className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5"
                  key={key}
                >
                  <div className="col-span-1 flex items-center">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                        {code.code}
                      </p>
                    </div>
                  </div>
                  <div className="col-span-2 hidden items-center sm:flex">
                    <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                      {code.description}
                    </p>
                  </div>
                  <div className="col-span-1 flex items-center">
                    <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                      {code.discountType == "1" ? "Fixed" : "Percentage"}
                    </p>
                  </div>
                  <div className="col-span-1 flex items-center">
                    <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                      {code.value}
                    </p>
                  </div>
                  
                  <div className="col-span-1 hidden sm:flex items-center">
                    <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                      {code.startDate.substring(0, 10)}
                    </p>
                  </div>
                  <div className="col-span-1 hidden sm:flex items-center">
                    <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                      {code.endDate.substring(0, 10)}
                    </p>
                  </div>
                  <div className="col-span-1 flex items-center justify-end space-x-3.5">
                    <EditCode code={code} setCodesData={setCodesData} />
                    {
                      code.isActive ? (
                        <button className="hover:text-primary" title="Freeze" onClick={() => handleFreezeCode(code.id)}>
                          <BiStopCircle />
                        </button>
                      ) : (
                        <button className="hover:text-primary" title="Activate" onClick={() => handleActivateCode(code.id)}>
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
            <div className="w-full flex justify-center items-center py-4">No codes found</div>
          )}
        </>
          
      )}
      </div>
    </div>
  );
};

export default DiscountCodes;