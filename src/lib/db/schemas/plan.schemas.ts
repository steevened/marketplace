import {
  boolean,
  decimal,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { account } from "./";

export const plans = pgTable("plans", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  price: decimal("price").notNull(),
  interval: varchar("interval", { length: 20 }).notNull().default("month"), //'month' or 'year'
});

export const accountPlans = pgTable("account_plans", {
  accountId: integer("account_id")
    .notNull()
    .references(() => account.id),
  planId: integer("plan_id")
    .notNull()
    .references(() => plans.id),
  status: varchar("status", { length: 20 }).notNull().default("active"), // 'active', 'cancelled', 'past_due'
  currentPeriodStart: timestamp("current_period_start").notNull().defaultNow(),
  currentPeriodEnd: timestamp("current_period_end").notNull(),
  cancelAtPeriodEnd: boolean("cancel_at_period_end").notNull().default(false),
  purchaseDate: timestamp("purchase_date").notNull().defaultNow(),
});
