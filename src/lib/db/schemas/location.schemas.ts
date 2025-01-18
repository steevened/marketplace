import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
  boolean,
  decimal,
  jsonb,
  primaryKey,
} from "drizzle-orm/pg-core";

export const provinces = pgTable("provinces", {
  id: serial("id").primaryKey(),
  label: varchar("label", { length: 100 }),
  name: varchar("name", { length: 100 }),
  slug: varchar("slug", { length: 200 }),
});

export const cities = pgTable("cities", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }),
  slug: varchar("slug", { length: 200 }),
  provinceId: integer("province_id").references(() => provinces.id),
});

export const countries = pgTable("countries", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }),
  slug: varchar("slug", { length: 200 }),
  code: varchar("code", { length: 3 }),
});
