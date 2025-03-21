"use client"
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { WithdrawRequest } from '@/types/withdrawRequest';
import ElementLoader from '../common/ElementLoader';
import WithdrawRequestModal from './WithdrawRequestModal';
import { FaEye } from 'react-icons/fa';

interface WithdrawalsProps {
    user: "Provider" | "Delivery"
}

const Withdrawals = ({ user }: WithdrawalsProps) => {
    const [withdrawals, setWithdrawals] = useState<WithdrawRequest[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedWithdrawal, setSelectedWithdrawal] = useState<WithdrawRequest | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const pageSize = 10;
    const employeeId = useParams().id;

    useEffect(() => {
        const fetchWithdrawals = async (page: number) => {
            try {
                const response = await fetch(`/backend/api/admin/withdrawVw/paginated/by-delivery-or-provider?partyId=${employeeId}&pageNumber=${page}&pageSize=${pageSize}`);
                const data = await response.json();
                if (data.status) {
                    setWithdrawals(data.data.withdraws);
                    setTotalCount(data.data.totalCount);
                } else {
                    console.error("Failed to fetch withdrawals:", data);
                }
            } catch (error) {
                console.error("Error fetching withdrawals:", error);
            }
        };

        const fetchUserId = async () => {
            setIsLoading(true);
            try {
                let response = null;
                if (user === "Provider") {
                    response = await fetch(`/backend/api/admin-panel/provider-by-id?providerId=${employeeId}`);
                } else if (user === "Delivery") {
                    response = await fetch(`/backend/api/admin-panel/delivery-by-id?deliveryId=${employeeId}`);
                }
                const data = await response?.json();
                if (data.status) {
                    fetchWithdrawals(currentPage);
                } else {
                    console.error("Failed to fetch user details:", data);
                }
            } catch (error) {
                console.error("Error fetching user id:", error);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchUserId();
    }, [currentPage, employeeId, user]);

    const totalPages = Math.ceil(totalCount / pageSize);

    const handleViewWithdrawal = (withdrawal: WithdrawRequest) => {
        setSelectedWithdrawal(withdrawal);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedWithdrawal(null);
    };

    return (
        <div>
            <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
                <div className="px-4 py-6 md:px-6 xl:px-9">
                    <h4 className="text-body-2xlg font-bold text-dark dark:text-white">Withdrawals</h4>
                </div>
                <div className="grid grid-cols-4 gap-4 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-4 md:px-6 2xl:px-7.5">
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium">Date</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium">Amount</p>
                    </div>
                    <div className="col-span-1 flex items-center justify-start">
                        <p className="font-medium">Status</p>
                    </div>
                    <div className="col-span-1 flex items-center justify-end">
                        <p className="font-medium">Actions</p>
                    </div>
                </div>
                {
                    isLoading ? ( 
                        <ElementLoader />
                    ) : withdrawals && withdrawals.length > 0 ? (
                        <>
                            {withdrawals.map((withdrawal) => (
                                <div
                                    className="grid grid-cols-4 gap-4 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-4 md:px-6 2xl:px-7.5"
                                    key={withdrawal.id}
                                >
                                    <div className="col-span-1 flex items-center">
                                        <p className="text-body-sm font-medium text-dark dark:text-dark-6">{new Date(withdrawal.date).toLocaleDateString()}</p>
                                    </div>
                                    <div className="col-span-1 flex items-center">
                                        <p className="text-body-sm font-medium text-[#219653]">{(withdrawal.activeBalanceReceives > withdrawal.activeBalanceDeductions) ? (withdrawal.activeBalanceReceives - withdrawal.activeBalanceDeductions) : 0} SAR</p>
                                    </div>
                                    <div className="col-span-1 flex items-center">
                                        <p
                                            className={`inline-flex rounded-full px-3.5 py-1 text-body-sm font-medium ${
                                                withdrawal.accepted
                                                    ? "bg-[#219653]/[0.08] text-[#219653]"
                                                    : withdrawal.rejected
                                                        ? "bg-[#D34053]/[0.08] text-[#D34053]"
                                                        : "bg-[#FFA70B]/[0.08] text-[#FFA70B]"
                                            }`}
                                        >
                                            {
                                            withdrawal.accepted
                                                    ? (<span>Accepted</span>)
                                                    : withdrawal.rejected
                                                        ? (<span>Rejected</span>)
                                                        : (<span>Pending</span>)
                                                        }
                                        </p>
                                    </div>
                                    <div className="col-span-1 flex items-center justify-end">
                                        <button
                                            onClick={() => handleViewWithdrawal(withdrawal)}
                                            className="text-dark dark:text-white rounded text-sm"
                                        >
                                            <FaEye />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        <>
                        <p>No Withdraws found</p>
                        </>
                    )
                }
                
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
            </div>

            {isModalOpen && selectedWithdrawal && (
                <WithdrawRequestModal
                    withdrawRequest={selectedWithdrawal}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default Withdrawals;