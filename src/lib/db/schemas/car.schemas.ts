import {
  boolean,
  decimal,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { cities, users } from "./";

export const cars = pgTable("cars", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 200 }),
  publishedBy: integer("created_by")
    .notNull()
    .references(() => users.id),
  modelId: integer("model_id").references(() => models.id),
  cityId: integer("city_id").references(() => cities.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const carSpecs = pgTable("car_specs", {
  id: serial("id").primaryKey(),
  carId: integer("car_id")
    .notNull()
    .unique()
    .references(() => cars.id),
  color: varchar("color", { length: 50 }),
  description: text("description"),
  uniqueOwner: boolean("unique_owner"),
});

export const carTechnicalDetails = pgTable("car_technical_details", {
  id: serial("id").primaryKey(),
  carId: integer("car_id")
    .notNull()
    .unique()
    .references(() => cars.id),
  mileage: integer("mileage"),
  fuelType: varchar("fuel_type", { length: 50 }),
  doors: integer("doors"),
  transmission: varchar("transmission", { length: 50 }),
  engine: varchar("engine", { length: 100 }),
  power: integer("power_hp"),
});

export const carComfortFeatures = pgTable("car_comfort_features", {
  id: serial("id").primaryKey(),
  carId: integer("car_id")
    .notNull()
    .unique()
    .references(() => cars.id),
  hasAirConditioning: boolean("has_air_conditioning"),
  hasCruiseControl: boolean("has_cruise_control"),
  hasLeatherSeats: boolean("has_leather_seats"),
});

export const carPricingInfo = pgTable("car_pricing_info", {
  id: serial("id").primaryKey(),
  carId: integer("car_id")
    .notNull()
    .unique()
    .references(() => cars.id),
  price: decimal("price", { precision: 10, scale: 2 }),
  negotiable: boolean("negotiable"),
  priceHistory: jsonb("price_history"),
});

export const carImages = pgTable("car_images", {
  id: serial("id").primaryKey(),
  carId: integer("car_id")
    .notNull()
    .references(() => cars.id),
  url: varchar("url", { length: 500 }).notNull(),
  isPrimary: boolean("is_primary").default(false),
  order: integer("order"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const brands = pgTable("brands", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }),
  slug: varchar("slug", { length: 200 }),
});

export const models = pgTable("models", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }),
  slug: varchar("slug", { length: 200 }),
  subtypeId: integer("subtype_id").references(() => carSubtypes.id),
  brandId: integer("brand_id").references(() => brands.id),
  year: integer("year"),
});

export const carSubtypes = pgTable("car_subtypes", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }),
  slug: varchar("slug", { length: 200 }),
});
