"use client";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

export default function PriceRange() {
  const [priceRange, setPriceRange] = useState([4500, 35000]);
  return (
    <div className="flex items-center justify-between  gap-1.5 w-full">
      <Input
        className="w-full"
        value={priceRange[0] || ""}
        onChange={(e) =>
          setPriceRange([parseInt(e.target.value), priceRange[1]])
        }
      />
      <Separator className="w-2" />
      <Input
        className="w-full"
        value={priceRange[1] || ""}
        onChange={(e) =>
          setPriceRange([priceRange[0], parseInt(e.target.value)])
        }
      />
    </div>
  );
}
