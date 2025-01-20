import PlanCard from "./components/plan-card";
import { getAvailablePlans, getPlanIntervals } from "./data";

export default async function Page() {
  const planIntervals = await getPlanIntervals();
  return (
    <div className="h-[calc(100svh-8rem)]">
      <div className="w-full h-full flex items-center justify-center">
        <PlanCard planIntervals={planIntervals} />
      </div>
    </div>
  );
}
