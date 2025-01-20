import { db } from "@/lib/db";
import { plans, planIntervalRelation, planInterval } from "@/lib/db/schemas";
import { eq } from "drizzle-orm";

export async function getAvailablePlans() {
  return await db
    .select({
      id: plans.id,
      name: plans.name,
      description: plans.description,
      type: plans.type,
      intervalId: planInterval.id,
      interval: planInterval.interval,
      price: planIntervalRelation.price,
    })
    .from(plans)
    .leftJoin(planIntervalRelation, eq(plans.id, planIntervalRelation.planId))
    .leftJoin(
      planInterval,
      eq(planInterval.id, planIntervalRelation.intervalId)
    );
}

export async function getPlanIntervals() {
  return await db
    .select({
      id: planInterval.id,
      interval: planInterval.interval,
      label: planInterval.label,
      plans: {
        // id: plans.id,
        // name: plans.name,
        // description: plans.description,
        // type: plans.type,
        // price: planIntervalRelation.price,
      },
    })
    .from(planInterval)
    .rightJoin(
      planIntervalRelation,
      eq(planInterval.id, planIntervalRelation.intervalId)
    );
}
// .leftJoin(plans, eq(plans.id, planIntervalRelation.planId));
