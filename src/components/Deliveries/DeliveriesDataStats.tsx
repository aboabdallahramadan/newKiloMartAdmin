"use client";
import React, {useEffect, useState} from "react";
import { dataStats } from "@/types/dataStats";


interface DeliveryStatsData {
  activeDeliveryCount: number;
  receivesSum: number;
  deductionsSum: number;
}

const DeliveriesDataStats: React.FC = () => {
  const [stats, setStats] = useState<DeliveryStatsData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch delivery statistics when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/backend/api/admin-panel/delivery-statistics");
        const result = await response.json();
        if (result.status) {
          setStats(result.data);
        } else {
          setError(result.message || "Failed to fetch data");
        }
      } catch (err) {
        setError("An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getBalance = () => {
    if (!stats) return 0;
    return stats.receivesSum - stats.deductionsSum;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !stats) {
    return <div>Error: {error}</div>;
  }

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
      title: "Total Deliveries",
      value: stats.activeDeliveryCount.toString(),
      // For growthRate, you may add your own logic/calculation if available
      growthRate: 0,
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
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13 23.8332C18.983 23.8332 23.8333 18.9829 23.8333 12.9998C23.8333 7.01675 18.983 2.1665 13 2.1665C7.01687 2.1665 2.16663 7.01675 2.16663 12.9998C2.16663 18.9829 7.01687 23.8332 13 23.8332ZM13.8125 6.49984C13.8125 6.05111 13.4487 5.68734 13 5.68734C12.5512 5.68734 12.1875 6.05111 12.1875 6.49984V6.84297C10.4212 7.15923 8.93746 8.48625 8.93746 10.2915C8.93746 12.3684 10.9013 13.8123 13 13.8123C14.4912 13.8123 15.4375 14.7935 15.4375 15.7082C15.4375 16.6228 14.4912 17.604 13 17.604C11.5088 17.604 10.5625 16.6228 10.5625 15.7082C10.5625 15.2594 10.1987 14.8957 9.74996 14.8957C9.30123 14.8957 8.93746 15.2594 8.93746 15.7082C8.93746 17.5134 10.4212 18.8404 12.1875 19.1567V19.4998C12.1875 19.9486 12.5512 20.3123 13 20.3123C13.4487 20.3123 13.8125 19.9486 13.8125 19.4998V19.1567C15.5788 18.8404 17.0625 17.5134 17.0625 15.7082C17.0625 13.6313 15.0986 12.1873 13 12.1873C11.5088 12.1873 10.5625 11.2061 10.5625 10.2915C10.5625 9.37688 11.5088 8.39567 13 8.39567C14.4912 8.39567 15.4375 9.37688 15.4375 10.2915C15.4375 10.7402 15.8012 11.104 16.25 11.104C16.6987 11.104 17.0625 10.7402 17.0625 10.2915C17.0625 8.48625 15.5788 7.15923 13.8125 6.84297V6.49984Z"
            fill="white"
          />
        </svg>
      ),
      color: "#FF9C55",
      title: "Total Deliveries Balance",
      value: `${getBalance()} SAR`,
      growthRate: 0,
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
            {/* You can add growth percentage display here if needed */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DeliveriesDataStats;
