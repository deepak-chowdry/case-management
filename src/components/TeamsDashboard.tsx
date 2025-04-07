"use client";
import { Team, useUser } from "@stackframe/stack";
import {
  BriefcaseBusiness,
  Search,
  Users
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const TeamsDashboard = () => {
  const router = useRouter();
  const user = useUser({ or: "redirect" });
  const allTeams = user.useTeams();

  const [teams, setTeams] = useState<Team[]>([]);
  //   const [members, setmembers] = useState(second);

  useEffect(() => {
    console.log(allTeams);
    setTeams(allTeams);
    // const allUsers = allTeams[0].listUsers();
    // allUsers.then((data) => {
    //   console.log(data);
    // });
  }, []);

  return (
    <div className="min-h-screen">
      <div className="flex-1 mx-auto">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">My Teams</h1>
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
                // onClick={() => router.push("/dashboard/newtimeline")}
                variant="outline"
              >
                <Users className="h-4 w-4" strokeWidth={1.5} />
                <span className="hidden md:flex">New Team</span>
              </Button>
            </div>

            {/* Content */}
            <div className="border rounded-xl overflow-hidden">
              <Table className="rounded-xl">
                <TableHeader className="border-b rounded-xl">
                  <TableRow>
                    <TableHead className="text-xs text-muted-foreground">
                      Team name
                    </TableHead>
                    <TableHead className="text-xs text-muted-foreground">
                      Owner
                    </TableHead>
                    <TableHead className="text-xs text-muted-foreground">
                      Members
                    </TableHead>
                    <TableHead className="text-xs text-muted-foreground text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allTeams === undefined ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        Loading cases...
                      </TableCell>
                    </TableRow>
                  ) : allTeams === null ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="h-24 text-center text-red-500"
                      >
                        Error loading cases
                      </TableCell>
                    </TableRow>
                  ) : teams?.length === 0 ? (
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
                    teams?.map((team: any) => (
                      <TableRow
                        key={team.id}
                        className="cursor-pointer transition-colors"
                        // onClick={() =>
                        //   router.push(`/dashboard/team/${team._id}`)
                        // }
                      >
                        <TableCell className="text-xs">
                          {team.displayName}
                        </TableCell>
                        <TableCell className="text-xs">Deepak</TableCell>
                        <TableCell className="text-xs">2</TableCell>
                        <TableCell className="text-xs text-end">
                          <Button variant="ghost">Manage</Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamsDashboard;
