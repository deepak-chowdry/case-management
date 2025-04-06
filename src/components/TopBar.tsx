"use client";
import { Separator } from "@/components/ui/separator";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";

const TopBar = () => {
  const { setTheme } = useTheme();
  const [isDark, setIsDark] = useState(true);

  const handleThemeToggle = () => {
    if (isDark) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
    setIsDark(!isDark);
  };

  return (
    <div className="w-full flex items-center justify-center h-14 shadow-md shadow-muted/20 sticky top-0 bg-background">
      <div className="w-[98%] flex items-center justify-between">
        <div className="flex h-5 items-center space-x-3 text-sm">
          <SidebarTrigger />
          <Separator orientation="vertical" />
        </div>

        <Button onClick={handleThemeToggle} variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </div>
  );
};

export default TopBar;
