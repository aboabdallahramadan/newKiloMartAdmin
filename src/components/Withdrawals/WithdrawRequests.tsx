"use client"
import React, { useEffect, useState } from 'react';
import { WithdrawRequest } from '@/types/withdrawRequest';
import { BiBlock, BiCheckCircle } from 'react-icons/bi';
import Link from 'next/link';

interface WithdrawRequestsProps {
    user: "Provider" | "Delivery"
}

const WithdrawRequests = ({ user }: WithdrawRequestsProps) => {
    const [withdrawRequests, setWithdrawRequests] = useState<Omit<WithdrawRequest, "status" | "date">[]>([
        {
            id: 1,
            name: "John Doe",
            phone: "123-456-7890",
            iban: "DE89370400440532013000",
            bankAccountNumber: "123456789",
            userId: 4
        },
        {
            id: 2,
            name: "Jane Smith",
            phone: "987-654-3210",
            iban: "FR7630006000011234567890189",
            bankAccountNumber: "987654321",
            userId: 4
        },
        {
            id: 3,
            name: "Alice Johnson",
            phone: "555-555-5555",
            iban: "GB29NWBK60161331926819",
            bankAccountNumber: "555555555",
            userId: 4
        }
    ]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const pageSize = 10;

    const fetchWithdrawRequests = async (page: number) => {
        const response = await fetch(`http://kilomart-001-site1.ptempurl.com/api/admin/withdraw-requests/paginated?page=${page}&pageSize=${pageSize}&isActive=true`);
        const data = await response.json();
        if (data.status) {
            setWithdrawRequests(data.data.data);
            setTotalCount(data.data.totalCount);
        }
    };

    useEffect(() => {
        // fetchWithdrawRequests(currentPage);
    }, [currentPage]);

    const onAccept = (id: number) => {
        console.log(id);
    };

    const onReject = (id: number) => {
        console.log(id);
    };

    const totalPages = Math.ceil(totalCount / pageSize);

    return (
        <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
            <div className="px-4 py-6 md:px-6 xl:px-9">
                <h4 className="text-body-2xlg font-bold text-dark dark:text-white">Withdraw Requests</h4>
            </div>
            <div className="grid grid-cols-6 gap-4 border-t border-stroke px-4 py-4.5 dark:border-dark-3 lg:grid-cols-9 md:px-6 2xl:px-7.5">
                <div className="col-span-1 flex items-center">
                    <p className="font-medium">Name</p>
                </div>
                <div className="col-span-2 items-center hidden lg:flex">
                    <p className="font-medium">Phone Number</p>
                </div>
                <div className="col-span-3 flex items-center">
                    <p className="font-medium">IBAN</p>
                </div>
                <div className="col-span-2 flex items-center">
                    <p className="font-medium">Bank Account Number</p>
                </div>
                <div className="col-span-1 flex items-center justify-end">
                    <p className="font-medium">Actions</p>
                </div>
            </div>
            {withdrawRequests.map((withdrawRequest) => (
                <div
                    className="grid grid-cols-6 gap-4 border-t border-stroke px-4 py-4.5 dark:border-dark-3 lg:grid-cols-9 md:px-6 2xl:px-7.5"
                    key={withdrawRequest.id}
                >
                    <div className="col-span-1 flex items-center">
                        <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                            <Link className='text-primary hover:text-primary/50' href={`/deliveries/${withdrawRequest.userId}`}>
                                {withdrawRequest.name}
                            </Link>
                        </p>
                    </div>
                    <div className="col-span-2 items-center hidden lg:flex">
                        <p className="text-body-sm font-medium text-dark dark:text-dark-6">{withdrawRequest.phone}</p>
                    </div>
                    <div className="col-span-3 flex items-center">
                        <p className="text-body-sm font-medium text-dark dark:text-dark-6 break-all">{withdrawRequest.iban}</p>
                    </div>
                    <div className="col-span-2 flex items-center">
                        <p className="text-body-sm font-medium text-dark dark:text-dark-6">{withdrawRequest.bankAccountNumber}</p>
                    </div>
                    <div className="col-span-1 flex items-center justify-end space-x-1.5 sm:space-x-3.5">
                        <button className="hover:text-primary" title="Accept" onClick={() => onAccept(withdrawRequest.id)}>
                            <BiCheckCircle />
                        </button>
                        <button className="hover:text-rose-600" title="Reject" onClick={() => onReject(withdrawRequest.id)}>
                            <BiBlock />
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
            
        </div>
    );
};

export default WithdrawRequests;