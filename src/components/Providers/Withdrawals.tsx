"use client"
import React, { useState } from 'react';
import { WithdrawRequest } from '@/types/withdrawRequest';
import { BiCheckCircle,BiBlock } from 'react-icons/bi';

const Withdrawals = () => {
    const [withdrawals, setWithdrawals] = useState<Omit<WithdrawRequest, "name" | "phone" | "iban" | "userId">[]>([
        {
            id: 1,
            bankAccountNumber: "123456789",
            status: "Approved",
            date: new Date().toLocaleDateString()
        },
        {
            id: 2,
            bankAccountNumber: "987654321",
            status: "Rejected",
            date: new Date().toLocaleDateString()
        },
        {
            id: 3,
            bankAccountNumber: "555555555",
            status: "Pending",
            date: new Date().toLocaleDateString()
        }
    ]);
    const onAccept = (id: number) => {
        console.log(id);
    };
    const onReject = (id: number) => {
        console.log(id);
    };
    return (
        <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
            <div className="px-4 py-6 md:px-6 xl:px-9">
                <h4 className="text-body-2xlg font-bold text-dark dark:text-white">Withdrawals</h4>
            </div>
            <div className="grid grid-cols-3 gap-4 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-5 md:px-6 2xl:px-7.5">
                <div className="col-span-2 hidden sm:flex items-center">
                    <p className="font-medium">Bank Account Number</p>
                </div>
                <div className="col-span-2 flex items-center">
                    <p className="font-medium">Date</p>
                </div>
                <div className="col-span-1 flex items-center justify-center">
                    <p className="font-medium">Status</p>
                </div>
            </div>
            {withdrawals.map((withdrawal) => (
                <div
                    className="grid grid-cols-3 gap-4 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-5 md:px-6 2xl:px-7.5"
                    key={withdrawal.id}
                >
                    <div className="col-span-2 hidden sm:flex items-center">
                        <p className="text-body-sm font-medium text-dark dark:text-dark-6">{withdrawal.bankAccountNumber}</p>
                    </div>
                    <div className="col-span-2 flex items-center">
                        <p className="text-body-sm font-medium text-dark dark:text-dark-6">{withdrawal.date}</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                    <p
                      className={`inline-flex rounded-full px-3.5 py-1 text-body-sm font-medium ${
                        withdrawal.status === "Approved"
                          ? "bg-[#219653]/[0.08] text-[#219653]"
                          : withdrawal.status === "Rejected"
                            ? "bg-[#D34053]/[0.08] text-[#D34053]"
                            : "bg-[#FFA70B]/[0.08] text-[#FFA70B]"
                      }`}
                    >
                      {withdrawal.status}
                    </p>
                    </div>

                </div>
            ))}
        </div>
    );
};

export default Withdrawals;