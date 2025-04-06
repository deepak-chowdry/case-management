"use client";
import React, { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CheckIcon,
  File,
  FilePlus,
  Upload,
  X,
  AlertCircle,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useEdgeStore } from "@/lib/edgestore";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useTimeline } from "@/hooks/useTimeline";

const NewTimeline = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [caseDetails, setCaseDetails] = useState({
    name: "",
    type: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<
    { url: string; name: string }[]
  >([]);
  const { edgestore } = useEdgeStore();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>(
    {}
  );
  const [error, setError] = useState<string | null>(null);

  const { createTimelineWithFiles, isLoading: convexLoading } = useTimeline();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      // Add the new files to the existing ones in state
      setFiles((prevFiles) => [...prevFiles, ...Array.from(selectedFiles)]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCaseDetails({ ...caseDetails, name: e.target.value });
  };

  const handleSelectChange = (value: string) => {
    setCaseDetails({ ...caseDetails, type: value });
  };

  const removeFile = (fileToRemove: File) => {
    setFiles(files.filter((file) => file !== fileToRemove));
  };

  const handleUploadFiles = async () => {
    try {
      if (files.length === 0) {
        setError("No files selected");
        return;
      }

      setUploading(true);
      setError(null);
      const uploadedFilesArray = [];

      // Upload files one by one to track individual progress
      for (const file of files) {
        // Initialize progress for this file
        setUploadProgress((prev) => ({
          ...prev,
          [file.name]: 0,
        }));

        // Upload the file
        const res = await edgestore.publicFiles.upload({
          file,
          onProgressChange: (progress) => {
            setUploadProgress((prev) => ({
              ...prev,
              [file.name]: progress,
            }));
          },
        });

        // Add the uploaded file info to our array
        uploadedFilesArray.push({
          url: res.url,
          name: file.name,
          size: file.size,
        });
      }

      // Update state with all uploaded files
      setUploadedFiles(uploadedFilesArray);
      console.log("Files uploaded successfully:", uploadedFilesArray);

      // Move to the next step after successful uploads
      setCurrentStep(currentStep + 1);
    } catch (err) {
      console.error("Error during file upload:", err);
      setError("Failed to upload files. Please try again.");
    } finally {
      setUploading(false);
      // Clear progress state
      setUploadProgress({});
    }
  };

  const isFormValid = () => {
    if (currentStep === 1) {
      return caseDetails.name.trim() !== "" && caseDetails.type !== "";
    }
    return true;
  };

  const handleCreateTimeline = async () => {
    try {
      // Call our simplified mutation
      await createTimelineWithFiles(
        {
          name: caseDetails.name,
          areaOfLaw: caseDetails.type,
        },
        uploadedFiles
      );

      // You could redirect here or show success message
      alert("Case successfully submitted!");
    } catch (err) {
      console.error("Error submitting case:", err);
      setError("Failed to submit case. Please try again.");
    }
  };

  return (
    <Card className="w-full md:w-xl space-y-3">
      <CardHeader>
        <CardTitle className="text-xl">Create new timeline</CardTitle>
        <CardDescription>
          {currentStep === 1 && <p>Enter timeline details</p>}
          {currentStep === 2 && <p>Upload timeline files</p>}
          {currentStep === 3 && <p>Review and submit timeline</p>}
        </CardDescription>
        <div className="flex flex-wrap justify-between mt-3">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center justify-between">
              <div
                className={`flex flex-col items-center ${
                  currentStep >= step ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    currentStep > step
                      ? "bg-foreground text-background"
                      : currentStep === step
                        ? "bg-foreground text-background"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step < currentStep ? (
                    <CheckIcon className="size-4" />
                  ) : (
                    <span>{step}</span>
                  )}
                </div>
                <span className="text-xs md:text-sm">
                  {step === 1 && (
                    <p className="text-xs md:text-sm">Timeline Details</p>
                  )}
                  {step === 2 && (
                    <p className="text-xs md:text-sm">Upload Files</p>
                  )}
                  {step === 3 && (
                    <p className="text-xs md:text-sm">Review & Submit</p>
                  )}
                </span>
              </div>
              {step <= 2 && (
                <div className="h-px w-28 bg-muted -translate-y-3 translate-x- hidden md:flex" />
              )}
            </div>
          ))}
        </div>
      </CardHeader>

      <CardContent className="p-">
        {currentStep === 1 && (
          <div className="flex flex-col w-full items-center gap-4">
            <div className="flex flex-col w-full space-y-2">
              <Label htmlFor="name">Case Name</Label>
              <Input
                id="name"
                placeholder="Name of your project"
                value={caseDetails.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col w-full space-y-2">
              <Label htmlFor="law">Area of Law</Label>
              <Select
                value={caseDetails.type}
                onValueChange={handleSelectChange}
              >
                <SelectTrigger id="law" className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="criminal law">Criminal Law</SelectItem>
                  <SelectItem value="civil law">Civil Law</SelectItem>
                  <SelectItem value="corporate law">Corporate Law</SelectItem>
                  <SelectItem value="family law">Family Law</SelectItem>
                  <SelectItem value="intellectual property law">
                    Intellectual Property Law
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full flex justify-end">
              <Button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="w-1/4"
                disabled={!isFormValid()}
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="flex flex-col w-full items-center gap-4">
            <div className="w-full">
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Card className="py-2 rounded-md border-none shadow-none">
                <CardContent className="flex items-center justify-end gap-4 w-full p-0">
                  <Button variant="outline">
                    <Label
                      htmlFor="file-upload"
                      className="cursor-pointer flex items-center gap-2"
                    >
                      <FilePlus className="size-4" strokeWidth={1.5} />
                      Add files
                    </Label>
                  </Button>
                  <Button
                    onClick={handleUploadFiles}
                    className=""
                    disabled={files.length === 0 || uploading}
                  >
                    <Upload className="size-4 mr-2" strokeWidth={1.5} />
                    {uploading ? "Uploading..." : "Upload"}
                  </Button>

                  <Input
                    type="file"
                    onChange={handleFileChange}
                    id="file-upload"
                    className="hidden"
                    multiple
                  />
                </CardContent>
              </Card>

              <div className="border rounded-lg overflow-hidden">
                <Table className="">
                  <TableHeader>
                    <TableRow className="border-b-0">
                      <TableHead>Your Files ({files.length})</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  {files.length !== 0 ? (
                    <TableBody className="w-full">
                      {files.map((file) => (
                        <TableRow
                          key={`${file.name}-${file.size}+${Math.random()}`}
                        >
                          <TableCell className="flex items-center gap-2">
                            <File
                              className="text-muted-foreground size-4"
                              strokeWidth={1.25}
                            />
                            <div className="flex flex-col gap-1 w-full">
                              <h3 className="text-xs text-ellipsis overflow-hidden">
                                {file.name}
                              </h3>
                              {uploading &&
                                uploadProgress[file.name] !== undefined && (
                                  <div className="w-full flex items-center gap-1">
                                    <Progress
                                      value={uploadProgress[file.name]}
                                      className="h-1 mt-1"
                                    />
                                    <p className="text-xs text-right mt-1">
                                      {Math.round(uploadProgress[file.name])}%
                                    </p>
                                  </div>
                                )}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            {!uploading && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFile(file)}
                              >
                                <X className="size-4" />
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  ) : (
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={2} className="text-center">
                          No files selected
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </div>
            </div>
            <div className="w-full flex justify-end gap-4">
              <Button
                onClick={() => setCurrentStep(currentStep - 1)}
                variant="outline"
                className="w-1/4"
                disabled={uploading}
              >
                Back
              </Button>
              <Button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="w-1/4"
                disabled={files.length === 0 || uploading}
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="flex flex-col gap-4 w-full">
            <Card className="shadow-none">
              <CardContent className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex gap-1 items-center">
                  <h3 className="font-medium text-sm">Case Name:</h3>
                  <p className="text-sm">{caseDetails.name}</p>
                </div>
                <div className="flex gap-1 items-center">
                  <h3 className="font-medium text-sm">Area of Law:</h3>
                  <p className="text-sm">{caseDetails.type}</p>
                </div>
              </CardContent>
            </Card>

            <div className="border p-4 rounded-xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-left">Uploaded files</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="w-full">
                  {uploadedFiles.length > 0 ? (
                    uploadedFiles.map((file, index) => (
                      <TableRow key={index}>
                        <TableCell className="flex items-center gap-1">
                          <File
                            className="text-muted-foreground size-4"
                            strokeWidth={1.25}
                          />
                          <p className="text-xs">{file.name}</p>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={2} className="text-center">
                        No files uploaded
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex justify-end gap-4">
              <Button
                onClick={() => setCurrentStep(currentStep - 1)}
                variant="outline"
                className="w-1/4"
              >
                Back
              </Button>
              <Button
                onClick={handleCreateTimeline}
                disabled={convexLoading}
                className="w-1/4"
              >
                {convexLoading ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NewTimeline;
