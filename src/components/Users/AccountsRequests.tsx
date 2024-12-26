"use client";
import { AccountRequest } from "@/types/accountRequest";
import { useEffect, useState } from "react";
import Loader from "../common/Loader";
import { BiCheckCircle, BiTrash } from "react-icons/bi";
import UserDetailsModal from "./UserDetailsModal";
import { AiOutlineEye } from "react-icons/ai";

interface AccountsRequestsProps {
    user: "Delivery" | "Provider"
}

const AccountsRequests = ({user}: AccountsRequestsProps) => {
  const [requestsData, setRequestsData] = useState<AccountRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<AccountRequest["user"] | null>(null);
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
        if(user == "Provider") {
            setRequestsData([
                {
                    user: {
                        providerId: 1,
                        userId: 101,
                        displayName: "Fresh Foods Market",
                        firstName: "Ahmed",
                        secondName: "Mohamed",
                        companyName: "Fresh Foods Co.",
                        nationalApprovalId: "SA12345",
                        ownerName: "Ahmed Mohamed",
                        ownerNationalId: "1234567890",
                        email: "ahmed@freshfoods.com",
                        isEmailVerified: false,
                        ownershipDocumentFile: "/files/sample.pdf",
                        ownerNationalApprovalFile: "/files/sample.pdf"
                    },
                  date: new Date().toLocaleDateString()
                },
                {
                    user: {
                        providerId: 2,
                        userId: 102,
                        displayName: "Electronics Hub",
                        firstName: "Sara",
                        secondName: "Ali",
                        companyName: "Tech Solutions Ltd",
                        nationalApprovalId: "SA67890",
                        ownerName: "Sara Ali",
                        ownerNationalId: "0987654321",
                        email: "sara@techsolutions.com",
                        isEmailVerified: true,
                        ownershipDocumentFile: "/files/sample.pdf",
                        ownerNationalApprovalFile: "/files/sample.pdf"
                    },
                  date: new Date().toLocaleDateString()
                }
              ])
        }
        else if(user == "Delivery")
             {
                setRequestsData([
                    {
                        user: {
                            deliveryId: 1,
                            userId: 201,
                            displayName: "Fast Delivery",
                            firstName: "Khalid",
                            secondName: "Hassan",
                            nationalId: "DEL123456",
                            nationalName: "Khalid Hassan",
                            drivingLicenseExpiredDate: "2025-12-31",
                            drivingLicenseNumber: "DL789012",
                            licenseExpiredDate: "2025-12-31",
                            licenseNumber: "LIC456789",
                            email: "khalid@fastdelivery.com",
                            isEmailVerified: true,
                            VehiclePhotoFile: "/files/sample.pdf",
                            DrivingLicenseFile: "/files/sample.pdf",
                            VehicleLicenseFile: "/files/sample.pdf",
                            NationalIqamaIDFile: "/files/sample.pdf"
                        },
                      date: new Date().toLocaleDateString()
                    },
                    {
                        user: {
                            deliveryId: 2,
                            userId: 202,
                            displayName: "Quick Delivery",
                            firstName: "Omar",
                            secondName: "Youssef",
                            nationalId: "DEL789012",
                            nationalName: "Omar Youssef",
                            drivingLicenseExpiredDate: "2026-06-30",
                            drivingLicenseNumber: "DL345678",
                            licenseExpiredDate: "2026-06-30",
                            licenseNumber: "LIC901234",
                            email: "omar@quickdelivery.com",
                            isEmailVerified: false,
                            VehiclePhotoFile: "/files/sample.pdf",
                            DrivingLicenseFile: "/files/sample.pdf",
                            VehicleLicenseFile: "/files/sample.pdf",
                            NationalIqamaIDFile: "/files/sample.pdf"
                        },
                        date: new Date().toLocaleDateString()
                    }
                  ])
             }
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
                        {request.user.displayName}
                      </p>
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <p className="text-body-sm font-medium text-dark dark:text-dark-6 break-all pr-4">
                      {request.user.email}
                    </p>
                  </div>
                  <div className="col-span-1 hidden items-center sm:flex">
                    <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                      {request.date}
                    </p>
                  </div>
                  <div className="col-span-1 flex items-center justify-end space-x-1.5 sm:space-x-3">
                  <button 
                        className="hover:text-primary" 
                        title="View Details"
                        onClick={() => setSelectedRequest(request.user)}
                    >
                        <AiOutlineEye />
                    </button>
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
      {selectedRequest && (
        <UserDetailsModal
            user={selectedRequest}
            
            handleCloseModal={() => setSelectedRequest(null)}
        />
    )}
    </div>
  );
};

export default AccountsRequests;