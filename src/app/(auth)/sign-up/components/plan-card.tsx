import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function PlanCard() {
  return (
    <Card className="w-[400px] ">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Selecciona tu plan
        </CardTitle>
      </CardHeader>
      <CardContent></CardContent>
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
