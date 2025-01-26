import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AvailablePlans, getAvailablePlans, getPlanIntervals } from "../data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  RadioCardGroup,
  RadioCardIndicator,
  RadioCardItem,
} from "@/components/ui/radio-card-group";
import { Label } from "@/components/ui/label";
export default function PlanCard({ plans }: { plans: AvailablePlans }) {
  // console.log(planIntervals);
  return (
    <Card className="w-[400px] ">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Selecciona tu plan
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RadioCardGroup
          // key={plan.id}
          defaultValue={plans.find((p) => p.type === "free")?.id.toString()}
        >
          {plans.map((plan) => (
            <RadioCardItem
              key={plan.id}
              value={plan.id.toString()}
              id={`plan-${plan.id}`}
            >
              <div className="flex items-start gap-3">
                <RadioCardIndicator className="mt-1" />
                <div>
                  <span className="sm:text-sm">
                    {plan.name} - ${Number(plan.price).toFixed(2)}
                  </span>
                  <p className="mt-1 text-xs text-gray-500">
                    {plan.description}
                  </p>
                </div>
              </div>
            </RadioCardItem>
            // <Label htmlFor={`plan-${plan.id}`}>
            //   <div className="flex flex-col">
            //     <span className="font-medium">{plan.name}</span>
            //     <span className="text-sm text-muted-foreground">
            //       {plan.description}
            //     </span>
            //     <span className="text-sm font-semibold">
            //       ${Number(plan.price).toFixed(2)}
            //     </span>
            //   </div>
            // </Label>
          ))}
        </RadioCardGroup>
      </CardContent>
      <CardFooter className="flex-col  text-xs text-muted-foreground">
        <div className="text-center">
          <p>
            Al continuar, estás aceptando nuestros{" "}
            <a href="#">términos y condiciones</a> y{" "}
            <a href="#">políticas de protección de datos</a>.
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
