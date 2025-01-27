import { db } from "@/lib/db";
import { plans } from "@/lib/db/schemas";
import { eq } from "drizzle-orm";

export async function getAvailablePlans() {
  return await db
    .select
    //   {
    //   id: plans.id,
    //   name: plans.name,
    //   description: plans.description,
    //   type: plans.type,
    //   intervalId: planInterval.id,
    //   interval: planInterval.interval,
    //   price: planIntervalRelation.price,
    // }
    ()
    .from(plans);
  // .leftJoin(planIntervalRelation, eq(plans.id, planIntervalRelation.planId))
  // .leftJoin(
  //   planInterval,
  //   eq(planInterval.id, planIntervalRelation.intervalId)
  // );
}

export type AvailablePlans = Awaited<ReturnType<typeof getAvailablePlans>>;
