"use client";
import React from "react";
import OrdersChart from "../Charts/OrdersChart";
import DataStatsOne from "@/components/DataStats/DataStatsOne";
import RevenueChart from "@/components/Charts/RevenueChart";
import MapOne from "../Maps/MapOne";
import MainMap from "../Maps/MainMap";

const ECommerce: React.FC = () => {
  return (
    <>
      <DataStatsOne />

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
        <RevenueChart />
        <OrdersChart />
        <div className="col-span-12">
          <MainMap />
        </div>
        {/* <MapOne /> */}
      </div>
    </>
  );
};

export default ECommerce;
