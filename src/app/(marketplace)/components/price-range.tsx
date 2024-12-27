"use client";

import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export default function PriceRange() {
  const [priceRange, setPriceRange] = useState([0, 25000]);
  return (
    <div className="grid gap-2">
      <h3 className="text-sm font-medium">Rango de precio</h3>
      <div className="grid gap-3">
        <Slider
          value={priceRange}
          max={200000}
          step={1000}
          onValueChange={setPriceRange}
        />
        <div className="flex items-center justify-between  gap-1.5">
          <Input
            type="number"
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([parseInt(e.target.value), priceRange[1]])
            }
          />

          <Input
            type="number"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], parseInt(e.target.value)])
            }
          />
        </div>
      </div>
    </div>
  );
}
