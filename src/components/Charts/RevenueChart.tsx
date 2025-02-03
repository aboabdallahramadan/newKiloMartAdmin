"use client";
import { ApexOptions } from "apexcharts";
import React,{useState, useEffect, use} from "react";
import ReactApexChart from "react-apexcharts";
import DefaultSelectOption from "@/components/SelectOption/DefaultSelectOption";
import ElementLoader from "../common/ElementLoader";

const RevenueChart: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2024 + 1 },
    (_, index) => (2024 + index).toString()
  );
  
  const [selectedType, setSelectedType] = useState("Yearly");
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedMonth, setSelectedMonth] = useState("1");

  const [totalCashPayments, setTotalCashPayments] = useState<number>(0);
  const [totalCardPayments, setTotalCardPayments] = useState<number>(0);


  const [isLoading, setIsLoading] = useState(false);


  const [chartSeries, setChartSeries] = useState([
    {
      name: "Cash Payments",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: "Card Payments", 
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ]);
  const options: ApexOptions = {
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#5750F1", "#0ABEF9"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      height: 310,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    fill: {
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 320,
          },
        },
      },
    ],
    stroke: {
      curve: "smooth",
    },

    markers: {
      size: 0,
    },
    grid: {
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      fixed: {
        enabled: !1,
      },
      x: {
        show: !1,
      },
      y: {
        title: {
          formatter: function (e) {
            return "";
          },
        },
      },
      marker: {
        show: !1,
      },
    },
    xaxis: {
      type: "category",
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: "0px",
        },
      },
    },
  };
  const [chartOptions, setChartOptions] = useState(options);
  const [Xasix, setXasix] = useState<string[]>([
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
  ]);
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };
  

  
  useEffect(() => {
    
    async function fetchData() {
      setIsLoading(true);
      let newXaxis: string[] = [];
      let newSeries: any[] = [];
      if (selectedType === "Yearly") {
        newXaxis = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        try {
          const res = await fetch(`/backend/api/admin-panel/payment-yearly-stats-by-year?year=${selectedYear}`);
          const json = await res.json();
          if (json.status) {
            newSeries = [
              {
                name: "Cash Payments",
                data: json.data.cashPayments,
              },
              {
                name: "Card Payments",
                data: json.data.cardPayments,
              },
            ];
            setTotalCashPayments(json.data.cashPayments.reduce((sum:number, value:number) => sum + value, 0));
            setTotalCardPayments(json.data.cardPayments.reduce((sum:number, value:number) => sum + value, 0));
          } else {
            // fallback to default data if response status is false
            newSeries = [
              {
                name: "Cash Payments",
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              },
              {
                name: "Card Payments",
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              },
            ];
          }
        } catch (error) {
          console.error("Error fetching yearly stats:", error);
          // fallback on error
          newSeries = [
            {
              name: "Cash Payments",
              data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            },
            {
              name: "Card Payments",
              data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            },
          ];
        }
      } else if (selectedType === "Monthly") {
        const numDays = getDaysInMonth(parseInt(selectedYear), parseInt(selectedMonth));
        newXaxis = Array.from({ length: numDays }, (_, i) => (i + 1).toString());
        try {
          const res = await fetch(`/backend/api/admin-panel/payment-yearly-stats-by-month?year=${selectedYear}&month=${selectedMonth}`);
          const json = await res.json();
          if (json.status) {
            newSeries = [
              {
                name: "Cash Payments",
                data: json.data.cashPayments,
              },
              {
                name: "Card Payments",
                data: json.data.cardPayments,
              },
            ];
            setTotalCashPayments(json.data.cashPayments.reduce((sum:number, value:number) => sum + value, 0));
            setTotalCardPayments(json.data.cardPayments.reduce((sum:number, value:number) => sum + value, 0));
          } else {
            // fallback to default data if response status is false
            newSeries = [
              {
                name: "Cash Payments",
                data: Array.from({ length: numDays }, () => 0),
              },
              {
                name: "Card Payments",
                data: Array.from({ length: numDays }, () => 0),
              },
            ];
          }
        } catch (error) {
          console.error("Error fetching yearly stats:", error);
          // fallback on error
          newSeries = [
            {
              name: "Cash Payments",
              data: Array.from({ length: numDays }, () => 0),
            },
            {
              name: "Card Payments",
              data: Array.from({ length: numDays }, () => 0),
            },
          ];
        }

      }
      setXasix(newXaxis);
      setChartSeries(newSeries);
      setChartOptions({
        ...options,
        xaxis: {
          ...options.xaxis,
          categories: newXaxis,
        },
      });
    setIsLoading(false);
    }
    fetchData();
  }, [selectedType, selectedYear, selectedMonth]);
  
  return (
    <div className="col-span-12 rounded-[10px] bg-white px-7.5 pb-6 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-7">
      <div className="mb-3.5 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
            Payments Overview
          </h4>
        </div>
        <div className="flex items-center gap-2.5">
          <DefaultSelectOption options={["Yearly", "Monthly"]} onSelect={(s : string) =>  setSelectedType(s)} />
        </div>
        <div className="flex items-center gap-2.5">
            <p className="font-medium uppercase text-dark dark:text-dark-6">
              Year
            </p>
            <DefaultSelectOption options={years} onSelect={(s : string) =>  setSelectedYear(s)} />
          </div>
        {selectedType === "Monthly" && (
          <div className="flex items-center gap-2.5">
            <p className="font-medium uppercase text-dark dark:text-dark-6">
              Month
            </p>
            <DefaultSelectOption options={["1", "2" , "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]} onSelect={(s : string) =>  setSelectedMonth(s)} />
          </div>)}
      </div>

      {
        isLoading ? (
          <ElementLoader size={12} />
        ) : (
          <div>
        <div className="-ml-4 -mr-5">
          <ReactApexChart
            options={chartOptions}
            series={chartSeries}
            type="area"
            height={310}
          />
        </div>
      </div>
        )
      }
      

      <div className="flex flex-col gap-2 text-center xsm:flex-row xsm:gap-0">
        <div className="border-stroke dark:border-dark-3 xsm:w-1/2 xsm:border-r">
          <div className="font-medium">
            <div className="w-3 h-3 rounded-full bg-[#5750F1] inline-block mr-2"></div> 
            Cash Payments
          </div>
          <h4 className="mt-1 text-xl font-bold text-dark dark:text-white">
            {totalCashPayments} SAR
          </h4>
        </div>
        <div className="xsm:w-1/2">
          <div className="font-medium">
          <div className="w-3 h-3 rounded-full bg-[#0ABEF9] inline-block mr-2"></div> 
          Card Payments
          </div>
          <h4 className="mt-1 text-xl font-bold text-dark dark:text-white">
          {totalCardPayments} SAR
          </h4>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;
