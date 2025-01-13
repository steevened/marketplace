"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  CreditCard,
  Users,
  Settings,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "#" },
  { icon: Package, label: "Products", href: "#" },
  { icon: CreditCard, label: "Payments", href: "#" },
  { icon: Users, label: "Customers", href: "#" },
  { icon: Settings, label: "Settings", href: "#" },
];

export default function AsideLayout() {
  const [collapsed, setCollapsed] = React.useState(false);
  return (
    <aside
      className={`${
        collapsed ? "w-16" : "w-64"
      } transition-all duration-300 ease-in-out`}
    >
      <div className="flex flex-col h-full">
        <div
          className={cn(
            "flex items-center  p-2 border-b",
            collapsed ? "justify-center" : " justify-between"
          )}
        >
          <h1
            className={`font-bold whitespace-nowrap ${
              collapsed ? "hidden " : "block"
            }`}
          >
            Admin Panel
          </h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </Button>
        </div>
        <nav className="flex-1 overflow-y-auto">
          <ul className="p-2 flex flex-col items-center gap-2">
            {sidebarItems.map((item, index) => (
              <li key={index} className="w-full">
                <Button
                  size={collapsed ? "icon" : "default"}
                  variant={"ghost"}
                  asChild
                  className={cn(
                    "w-full",
                    collapsed ? "justify-center" : "justify-start"
                  )}
                >
                  <Link href="#">
                    <item.icon size={24} />
                    <span className={`ml-3 ${collapsed ? "hidden" : "block"}`}>
                      {item.label}
                    </span>
                  </Link>
                </Button>
                {/* <a
                  href={item.href}
                  className="flex items-center p-2 rounded-lg  transition-colors duration-150"
                >
                  <item.icon size={24} className="text-gray-500" />
                  <span className={`ml-3 ${collapsed ? "hidden" : "block"}`}>
                    {item.label}
                  </span>
                </a> */}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
