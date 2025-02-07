"use client";
import React, { useEffect, useState } from "react";

interface CustomerSummary {
  activeCustomersCount: number;
  inactiveCustomersCount: number;
}

const CustomersDataStats: React.FC = () => {
  const [summary, setSummary] = useState<CustomerSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch("/backend/api/admin-panel/customers-summary");
        const result = await res.json();
        if (result.status) {
          setSummary(result.data);
        } else {
          console.error("Failed to fetch customers summary:", result.message);
        }
      } catch (error) {
        console.error("Error fetching customers summary:", error);
      }
      setLoading(false);
    };
    fetchSummary();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!summary) return <div>Error loading data</div>;

  const dataStatsList = [
    {
      icon: (
        <svg
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse
            cx="9.75106"
            cy="6.49984"
            rx="4.33333"
            ry="4.33333"
            fill="white"
          />
          <ellipse
            cx="9.75106"
            cy="18.4178"
            rx="7.58333"
            ry="4.33333"
            fill="white"
          />
          <path
            d="M22.7496 18.4173C22.7496 20.2123 20.5445 21.6673 17.8521 21.6673C18.6453 20.8003 19.1907 19.712 19.1907 18.4189C19.1907 17.1242 18.644 16.0349 17.8493 15.1674C20.5417 15.1674 22.7496 16.6224 22.7496 18.4173Z"
            fill="white"
          />
          <path
            d="M19.4996 6.50098C19.4996 8.2959 18.0446 9.75098 16.2496 9.75098C15.8582 9.75098 15.483 9.68179 15.1355 9.55498C15.648 8.65355 15.9407 7.61084 15.9407 6.49977C15.9407 5.38952 15.6484 4.34753 15.1366 3.44656C15.4838 3.32001 15.8587 3.25098 16.2496 3.25098C18.0446 3.25098 19.4996 4.70605 19.4996 6.50098Z"
            fill="white"
          />
        </svg>
      ),
      color: "#18BFFF",
      title: "Total Active Customers",
      value: summary.activeCustomersCount.toString(),
      growthRate: -0.95,
    },
    {
      icon: (
        <svg
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse
            cx="9.75106"
            cy="6.49984"
            rx="4.33333"
            ry="4.33333"
            fill="white"
          />
          <ellipse
            cx="9.75106"
            cy="18.4178"
            rx="7.58333"
            ry="4.33333"
            fill="white"
          />
          <path
            d="M22.7496 18.4173C22.7496 20.2123 20.5445 21.6673 17.8521 21.6673C18.6453 20.8003 19.1907 19.712 19.1907 18.4189C19.1907 17.1242 18.644 16.0349 17.8493 15.1674C20.5417 15.1674 22.7496 16.6224 22.7496 18.4173Z"
            fill="white"
          />
          <path
            d="M19.4996 6.50098C19.4996 8.2959 18.0446 9.75098 16.2496 9.75098C15.8582 9.75098 15.483 9.68179 15.1355 9.55498C15.648 8.65355 15.9407 7.61084 15.9407 6.49977C15.9407 5.38952 15.6484 4.34753 15.1366 3.44656C15.4838 3.32001 15.8587 3.25098 16.2496 3.25098C18.0446 3.25098 19.4996 4.70605 19.4996 6.50098Z"
            fill="white"
          />
        </svg>
      ),
      color: "#18BFFF",
      title: "Total Inactive Customers",
      value: summary.inactiveCustomersCount.toString(),
      growthRate: -0.95,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      {dataStatsList.map((item, index) => (
        <div
          key={index}
          className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark"
        >
          <div
            className="flex h-14.5 w-14.5 items-center justify-center rounded-full"
            style={{ backgroundColor: item.color }}
          >
            {item.icon}
          </div>
          <div className="mt-6 flex items-end justify-between">
            <div>
              <h4 className="mb-1.5 text-heading-6 font-bold text-dark dark:text-white">
                {item.value}
              </h4>
              <span className="text-body-sm font-medium">{item.title}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomersDataStats;
