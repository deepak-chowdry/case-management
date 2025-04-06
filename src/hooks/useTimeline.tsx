// useCase.ts
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import { api } from "../../convex/_generated/api";

interface FileUpload {
  name: string;
  url: string;
  size?: number;
  mimeType?: string;
  description?: string;
  timelineDate?: number;
  edgestoreId?: string;
}

interface CaseDetails {
  name: string;
  areaOfLaw: string;
  description?: string;
  tags?: string[];
}

export const useTimeline = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createTimeline = useMutation(api.timeline.createTimeline);

  // Combined function to create case, add files, and optionally submit
  const handleCreateTimelineWithFiles = async (
    caseDetails: CaseDetails,
    files: FileUpload[]
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await createTimeline({
        ...caseDetails,
        files,
      });

      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to process case");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const allTimelines = useQuery(api.timeline.getAllTimelines);

  return {
    isLoading,
    error,
    createTimelineWithFiles: handleCreateTimelineWithFiles,
    allTimelines,
  };
};
