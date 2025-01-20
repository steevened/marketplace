import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAvailablePlans, getPlanIntervals } from "../data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  RadioCardGroup,
  RadioCardItem,
} from "@/components/ui/radio-card-group";
import { Label } from "@/components/ui/label";
export default function PlanCard({
  planIntervals,
}: {
  planIntervals: Awaited<ReturnType<typeof getPlanIntervals>>;
}) {
  console.log(planIntervals);
  return (
    <Card className="w-[400px] ">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Selecciona tu plan
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={planIntervals[0]?.interval} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            {planIntervals.map((interval) => (
              <TabsTrigger key={interval.id} value={interval.interval}>
                {interval.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {planIntervals.map((interval) => (
            <TabsContent key={interval.id} value={interval.interval}>
              {/* <RadioCardGroup defaultValue={interval.plans[0]?.id?.toString()}>
                {interval.plans.map((plan) => (
                  <div key={plan.id} className="flex items-center space-x-2">
                    <RadioCardItem value={plan.id.toString()} id={`plan-${plan.id}`} />
                    <Label htmlFor={`plan-${plan.id}`}>
                      <div className="flex flex-col">
                        <span className="font-medium">{plan.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {plan.description}
                        </span>
                        <span className="text-sm font-semibold">
                          ${Number(plan.price).toFixed(2)}
                        </span>
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioCardGroup> */}
            </TabsContent>
          ))}
        </Tabs>
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
