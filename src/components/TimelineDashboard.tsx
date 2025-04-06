"use client";
import {
  BriefcaseBusiness,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
} from "lucide-react";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useTimeline } from "@/hooks/useTimeline";

const TimelineDashboard = () => {
  const router = useRouter();
  const cases: any = [];
  const { allTimelines } = useTimeline();
  return (
    <div className="min-h-screen">
      <div className="flex-1 mx-auto">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">My Cases</h1>
            <p className="text-gray-500">You are all set to start your day.</p>
          </div>

          <div className="border rounded-xl p-3">
            {/* Header */}
            <div className="flex gap-2 justify-between items-center mb-6">
              <div className="flex justify-between items-center w-10/12 md:w-fit md:gap-3">
                <div className="relative w-4/6 md:w-[280px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Filter by case..." className="pl-9" />
                </div>
                <div className="flex items-center gap-1">
                  <Select>
                    <SelectTrigger className="w-fit h-8">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="canceled">Canceled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button
                onClick={() => router.push("/dashboard/newtimeline")}
                variant="outline"
              >
                <BriefcaseBusiness className="h-4 w-4" strokeWidth={1.5} />
                <span className="hidden md:flex">New Timeline</span>
              </Button>
            </div>

            {/* Content */}
            <div className="border rounded-xl overflow-hidden">
              <Table className="rounded-xl">
                <TableHeader className="border-b rounded-xl">
                  <TableRow>
                    <TableHead className="text-xs text-muted-foreground">
                      Case Title
                    </TableHead>
                    <TableHead className="text-xs text-muted-foreground">
                      Type
                    </TableHead>
                    <TableHead className="text-xs text-muted-foreground">
                      Files
                    </TableHead>
                    <TableHead className="text-xs text-muted-foreground">
                      Created
                    </TableHead>
                    <TableHead className="text-xs text-muted-foreground text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allTimelines === undefined ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        Loading cases...
                      </TableCell>
                    </TableRow>
                  ) : allTimelines === null ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="h-24 text-center text-red-500"
                      >
                        Error loading cases
                      </TableCell>
                    </TableRow>
                  ) : allTimelines?.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="h-[250px] text-center cursor-pointer"
                      >
                        <div className="flex flex-col items-center justify-center h-full space-y-2">
                          <h2 className="text-xl font-semibold">
                            Start Your Case Timeline Journey
                          </h2>
                          <p className="text-gray-500 max-w-md text-center">
                            Create a new timeline to organize and visualize your
                            case events.
                          </p>
                          <Button
                            onClick={() =>
                              router.push("/dashboard/newtimeline")
                            }
                            className="mt-4  flex items-center gap-2"
                          >
                            <BriefcaseBusiness
                              className="h-4 w-4"
                              strokeWidth={1.5}
                            />
                            <span>New Timeline</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    allTimelines?.map((timeline: any) => (
                      <TableRow
                        key={timeline._id}
                        className="cursor-pointer transition-colors"
                        onClick={() =>
                          router.push(`/dashboard/cases/${timeline._id}`)
                        }
                      >
                        <TableCell className="font-medium">
                          {timeline.name}
                        </TableCell>
                        <TableCell>{timeline.areaOfLaw}</TableCell>
                        <TableCell>
                          {/* <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              timeline.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {timeline.status}
                          </span> */}
                          <span>{timeline.files.length}</span>
                        </TableCell>
                        <TableCell>
                          {new Date(timeline.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Footer */}
            <div className="flex flex-col md:flex-row gap-3 justify-between items-center mt-4 text-sm text-gray-500">
              <div className="flex items-center justify-between gap-4 w-full md:w-1/2">
                <div>
                  <p className="text-xs md:text-sm">0 of 0 row(s) selected.</p>
                </div>
                <div className="flex items-center gap-1">
                  <p className="text-xs md:text-sm"> Rows per page</p>
                  <Select defaultValue="10">
                    <SelectTrigger className="w-20 h-8">
                      <SelectValue placeholder="10" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <div>Page 1 of 0</div>

                <div className="flex items-center">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ChevronsLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ChevronsRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-gray-500">
            <p>
              Note: Your data is secure and will not be used for model training.
            </p>
            <p>
              It can be removed at any time upon request or once the job is
              complete.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineDashboard;
