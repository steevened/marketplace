"use client";

import PlanCard from "./components/plan-card";

export default function Page() {
  return (
    <div className="h-[calc(100svh-4rem)]">
      <div className="w-full h-full flex items-center justify-center">
        <PlanCard />
      </div>
    </div>
  );
}
