import { getAvailablePlans } from "../data";
import PlansCard from "./plans-card";

export default async function SelectPlanSection() {
  const plans = await getAvailablePlans();
  return (
    <div className="h-full">
      <div className="w-full h-full flex items-center justify-center">
        <PlansCard plans={plans} />
      </div>
    </div>
  );
}
