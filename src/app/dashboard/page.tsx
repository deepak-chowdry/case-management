import TimelineDashboard from "@/components/TimelineDashboard";
import React from "react";

const DashboardPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="py-6 w-11/12">
        <TimelineDashboard />
      </div>
    </div>
  );
};

export default DashboardPage;
