"use client";
import { useParams } from "next/navigation";

const TimelinePage = () => {
  const { id } = useParams();
  return (
    <div>
      <div>{id}</div>
    </div>
  );
};

export default TimelinePage;
