import {
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { users, teams } from "./";

export const account = pgTable("accounts", {
  id: serial("id").primaryKey(),
  name: varchar("name"),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationTokens) => {
    return [
      {
        pk: primaryKey({
          columns: [verificationTokens.identifier, verificationTokens.token],
        }),
        pkWithCustomName: primaryKey({
          name: "verification_token_pk",
          columns: [verificationTokens.identifier, verificationTokens.token],
        }),
      },
    ];
  }
);

export const activityLogs = pgTable("activity_logs", {
  id: serial("id").primaryKey(),
  teamId: integer("team_id")
    .notNull()
    .references(() => teams.id),
  userId: integer("user_id").references(() => users.id),
  action: text("action").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  ipAddress: varchar("ip_address", { length: 45 }),
});
