"use client"
import React, { useEffect, useState } from 'react';
import { WithdrawRequest } from '@/types/withdrawRequest';
import WithdrawalModal from './WithdrawalModal';
import Link from 'next/link';

const WithdrawalsHistory = () => {
    const [selectedRequest, setSelectedRequest] = useState<WithdrawRequest | null>(null);
    const [withdrawRequests, setWithdrawRequests] = useState<WithdrawRequest[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const pageSize = 10;

    const fetchWithdrawRequests = async (page: number) => {
        try {
          const response = await fetch(`/backend/api/admin/withdrawVw/paginated/by-done?done=true&pageNumber=${page}&pageSize=${pageSize}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          if (data.status) {
            setWithdrawRequests(data.data.withdraws);
            setTotalCount(data.data.totalCount);
          } else {
            console.error("Error from backend:", data.message);
          }
        } catch (error) {
          console.error("Error fetching withdraw requests:", error);
        }
      };

    useEffect(() => {
        fetchWithdrawRequests(currentPage);
    }, [currentPage]);
    const totalPages = Math.ceil(totalCount / pageSize);

    return (
        <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
            <div className="px-4 py-6 md:px-6 xl:px-9">
                <h4 className="text-body-2xlg font-bold text-dark dark:text-white">Withdraw History</h4>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4 border-t border-stroke px-4 py-4.5 dark:border-dark-3 lg:grid-cols-7 md:px-6 2xl:px-7.5">
                <div className="col-span-1 flex items-center">
                    <p className="font-medium">Name</p>
                </div>
                <div className="col-span-2 items-center hidden lg:flex">
                    <p className="font-medium">Date</p>
                </div>
                <div className="col-span-2 hidden md:flex items-center">
                    <p className="font-medium">Bank Account Number</p>
                </div>
                {/* <div className="col-span-1 flex items-center">
                    <p className="font-medium">Amount</p>
                </div> */}
                <div className="col-span-1 flex items-center">
                    <p className="font-medium">Status</p>
                </div>
                <div className="col-span-1 flex items-center justify-end">
                    <p className="font-medium">Actions</p>
                </div>
            </div>
            {withdrawRequests.map((withdrawRequest) => (
                <div
                    className="grid grid-cols-3 md:grid-cols-5 gap-4 border-t border-stroke px-4 py-4.5 dark:border-dark-3 lg:grid-cols-7 md:px-6 2xl:px-7.5"
                    key={withdrawRequest.id}
                >
                    <div className="col-span-1 flex items-center">
                        <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                        {
                                withdrawRequest.providerId ? (
                                <Link className='text-primary hover:text-primary/50' href={`/providers/${withdrawRequest.providerId}`
                                }>
                                    Provider: {withdrawRequest.partyDisplayName}
                                </Link> 
                                ) : (
                                    <Link className='text-primary hover:text-primary/50' href={`/deliveries/${withdrawRequest.deliveryId}`
                                    }>
                                        Delivery: {withdrawRequest.partyDisplayName}
                                    </Link> 
                                )
                            }
                        </p>
                    </div>
                    <div className="col-span-2 items-center hidden lg:flex">
                        <p className="text-body-sm font-medium text-dark dark:text-dark-6">{new Date(withdrawRequest.date).toLocaleDateString()}</p>
                    </div>
                    <div className="col-span-2 hidden md:flex items-center">
                        <p className="text-body-sm font-medium text-dark dark:text-dark-6">{withdrawRequest.bankAccountNumber}</p>
                    </div>
                    {/* <div className="col-span-1 flex items-center">
                        <p className="text-body-sm font-medium text-[#219653]">
                            {(withdrawRequest.activeBalanceReceives > withdrawRequest.activeBalanceDeductions) ? (withdrawRequest.activeBalanceReceives - withdrawRequest.activeBalanceDeductions) : 0}
                            SAR</p>
                    </div> */}
                    <div className="col-span-1 flex items-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            withdrawRequest.accepted
                                ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400'
                                : withdrawRequest.rejected
                                ? 'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400'
                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400'
                        }`}>
                            {
                                withdrawRequest.accepted
                                    ? (<span>Accepted</span>)
                                    : withdrawRequest.rejected
                                        ? (<span>Rejected</span>)
                                        : (<span>Pending</span>)
                            }
                        </span>
                    </div>
                    <div className="col-span-1 flex items-center justify-end space-x-1.5 sm:space-x-3.5">
                        <button 
                            className="hover:text-primary" 
                            title="View" 
                            onClick={() => setSelectedRequest(withdrawRequest)}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.58 12C15.58 13.98 13.98 15.58 12 15.58C10.02 15.58 8.42004 13.98 8.42004 12C8.42004 10.02 10.02 8.42004 12 8.42004C13.98 8.42004 15.58 10.02 15.58 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 20.27C15.53 20.27 18.82 18.19 21.11 14.59C22.01 13.18 22.01 10.81 21.11 9.39997C18.82 5.79997 15.53 3.71997 12 3.71997C8.47003 3.71997 5.18003 5.79997 2.89003 9.39997C1.99003 10.81 1.99003 13.18 2.89003 14.59C5.18003 18.19 8.47003 20.27 12 20.27Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </div>
            ))}
            <div className="flex justify-between px-4 py-4">
                <button 
                    disabled={currentPage === 1} 
                    onClick={() => setCurrentPage(currentPage - 1)} 
                    className="bg-gray-300 hover:bg-gray-400 rounded px-4 py-2"
                >
                    Previous
                </button>
                <div className="flex justify-center space-x-2">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
                <button 
                    disabled={currentPage === totalPages} 
                    onClick={() => setCurrentPage(currentPage + 1)} 
                    className="bg-gray-300 hover:bg-gray-400 rounded px-4 py-2"
                >
                    Next
                </button>
            </div>
            {selectedRequest && (
                <WithdrawalModal 
                    withdrawRequest={selectedRequest} 
                    onClose={() => setSelectedRequest(null)}
                />
            )}
        </div>
    );
};

export default WithdrawalsHistory;