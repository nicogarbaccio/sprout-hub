import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/contexts/ThemeContext";

export function ThemeToggle() {
  const { theme, setTheme, actualTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 rounded-full bg-plant-neutral dark:bg-plant-neutral-dark border border-plant-secondary/20 hover:bg-plant-secondary/10 dark:hover:bg-plant-secondary/20 transition-all duration-200"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-plant-primary dark:text-yellow-400" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-plant-primary dark:text-blue-200" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-40 bg-card/95 backdrop-blur-sm border-border/50"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="cursor-pointer hover:bg-accent/50 focus:bg-accent/50"
        >
          <Sun className="mr-2 h-4 w-4 text-plant-warning dark:text-yellow-400" />
          <span>Light</span>
          {theme === "light" && (
            <div className="ml-auto h-2 w-2 rounded-full bg-plant-primary dark:bg-primary"></div>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="cursor-pointer hover:bg-accent/50 focus:bg-accent/50"
        >
          <Moon className="mr-2 h-4 w-4 text-plant-primary dark:text-blue-200" />
          <span>Dark</span>
          {theme === "dark" && (
            <div className="ml-auto h-2 w-2 rounded-full bg-plant-primary dark:bg-primary"></div>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="cursor-pointer hover:bg-accent/50 focus:bg-accent/50"
        >
          <Monitor className="mr-2 h-4 w-4 text-plant-water dark:text-cyan-300" />
          <span>System</span>
          {theme === "system" && (
            <div className="ml-auto h-2 w-2 rounded-full bg-plant-primary dark:bg-primary"></div>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Alternative simple toggle for mobile or compact layouts
export function SimpleThemeToggle() {
  const { actualTheme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(actualTheme === "light" ? "dark" : "light")}
      className="h-9 w-9 rounded-full bg-plant-neutral dark:bg-plant-neutral-dark border border-plant-secondary/20 hover:bg-plant-secondary/10 dark:hover:bg-plant-secondary/20 transition-all duration-200"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-plant-primary dark:text-yellow-400" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-plant-primary dark:text-blue-200" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
