import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  RadioCardGroup,
  RadioCardIndicator,
  RadioCardItem,
} from "@/components/ui/radio-card-group";
import { AvailablePlans } from "../data";
export default function PlansCard({ plans }: { plans: AvailablePlans }) {
  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Selecciona tu plan
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RadioCardGroup
          defaultValue="free"
          // key={plan.id}
          // defaultValue={plans.find((p) => p.type === "free")?.id.toString()}
        >
          <RadioCardItem value={"free"} id={`free`}>
            <div className="flex items-start gap-3">
              <RadioCardIndicator className="mt-1" />
              <div className="flex justify-between w-full">
                <span className="sm:text-sm">Free</span>
              </div>
            </div>
          </RadioCardItem>
          {plans.map((plan) => (
            <RadioCardItem
              key={plan.id}
              value={plan.id.toString()}
              id={`plan-${plan.id}`}
            >
              <div className="flex items-start gap-3">
                <RadioCardIndicator className="mt-1" />
                <div className="flex justify-between w-full">
                  <span className="sm:text-sm">{plan.name}</span>

                  <Badge>${plan.price} / mes</Badge>
                </div>
              </div>
            </RadioCardItem>
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
