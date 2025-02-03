'use client';
import { ApexOptions } from "apexcharts";
import React, {useState , useEffect} from "react";
import ReactApexChart from "react-apexcharts";
import { OrdersCountSummary } from "@/types/ordersCountSummary";
import ElementLoader from "../common/ElementLoader";


const OrdersChart: React.FC = () => {
  const [series, setSeries] = useState<number[]>([10,20,30,40]);
  const [ordersCountSummary, setOrdersCountSummary] = useState<OrdersCountSummary>({
    canceledOrders: 30,
    completedOrders: 40,
    totalOrders: 100,
    noProviderAccepted: 20,
    noDeliveryAccepted: 10,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
      const fetchAllData = async () => {
        setIsLoading(true);
      try {
        const response = await fetch('/backend/api/admin-panel/orders-count-summary');
        const res = await response.json();
        if(res.status == true){
          setOrdersCountSummary(res.data);
        setSeries([
          res.data.completedOrders,
          res.data.noProviderAccepted,
          res.data.noDeliveryAccepted,
          (res.data.totalOrders - res.data.completedOrders - res.data.noProviderAccepted - res.data.noDeliveryAccepted)
        ]);
        }
        else{
          console.log(res.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    // fetchAllData();
  }, []);

  const options: ApexOptions = {
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "donut",
    },
    colors: ["#5750F1", "#5475E5", "#8099EC", "#ADBCF2"],
    labels: ["Completed", "There is no provider accepted it", "There is no delivery accepted it" , "Other"],
    legend: {
      show: false,
      position: "bottom",
    },

    plotOptions: {
      pie: {
        donut: {
          size: "80%",
          background: "transparent",
          labels: {
            show: true,
            total: {
              show: true,
              showAlways: true,
              label: "Total Orders",
              fontSize: "16px",
              fontWeight: "400",
            },
            value: {
              show: true,
              fontSize: "28px",
              fontWeight: "bold",
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 415,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };

  return (
    <div className="col-span-12 rounded-[10px] bg-white px-7.5 pb-7 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-5">
      <div className="mb-9 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
            Orders
          </h4>
        </div>
      </div>
      {
        isLoading ? (
          <ElementLoader />
        ) : (
          <>
          <div className="mb-8">
            <div className="mx-auto flex justify-center">
              <ReactApexChart options={options} series={series} type="donut" />
            </div>
          </div>

          <div className="mx-auto w-full max-w-[350px]">
            <div className="-mx-7.5 flex flex-wrap items-center justify-center gap-y-2.5">
              <div className="w-full px-7.5 sm:w-1/2">
                <div className="flex w-full items-center">
                  <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-blue"></span>
                  <p className="flex w-full justify-between text-body-sm font-medium text-dark dark:text-dark-6">
                    <span> Completed </span>
                    <span> {(ordersCountSummary.completedOrders * 100 / ordersCountSummary.totalOrders).toFixed()}% </span>
                  </p>
                </div>
              </div>
              <div className="w-full px-7.5 sm:w-1/2">
                <div className="flex w-full items-center">
                  <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-blue-light"></span>
                  <p className="flex w-full justify-between text-body-sm font-medium text-dark dark:text-dark-6">
                    <span> There is no delivery accepted it </span>
                    <span> {(ordersCountSummary.noDeliveryAccepted * 100 / ordersCountSummary.totalOrders).toFixed()}% </span>
                  </p>
                </div>
              </div>
              <div className="w-full px-7.5 sm:w-1/2">
                <div className="flex w-full items-center">
                  <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-blue-light-2"></span>
                  <p className="flex w-full justify-between text-body-sm font-medium text-dark dark:text-dark-6">
                    <span> There is no provider accepted it </span>
                    <span> {(ordersCountSummary.noProviderAccepted * 100 / ordersCountSummary.totalOrders).toFixed()}% </span>
                  </p>
                </div>
              </div>
              <div className="w-full px-7.5 sm:w-1/2">
                <div className="flex w-full items-center">
                  <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-blue-light-3"></span>
                  <p className="flex w-full justify-between text-body-sm font-medium text-dark dark:text-dark-6">
                  <span> Other</span>
                    <span> {((ordersCountSummary.totalOrders - ordersCountSummary.completedOrders - ordersCountSummary.noDeliveryAccepted - ordersCountSummary.noProviderAccepted) * 100 / ordersCountSummary.totalOrders).toFixed()}% </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          </> )
      }
      
    </div>
  );
};

export default OrdersChart;
