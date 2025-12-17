import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const visitors = pgTable("visitors", {
  id: serial("id").primaryKey(),
  joinedAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  userAgent: varchar("lastname", { length: 500 }),
});
