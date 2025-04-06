import NewTimeline from "@/components/NewTimeline";
import React from "react";

const NewTimelinePage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="py-6 w-11/12 flex justify-center">
        <NewTimeline />
      </div>
    </div>
  );
};

export default NewTimelinePage;
