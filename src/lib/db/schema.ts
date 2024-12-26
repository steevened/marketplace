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
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: varchar("role", { length: 20 }).notNull().default("user"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const teams = pgTable("teams", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  teamId: integer("team_id")
    .notNull()
    .references(() => teams.id),
  role: varchar("role", { length: 50 }).notNull(),
  joinedAt: timestamp("joined_at").notNull().defaultNow(),
});

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

export const invitations = pgTable("invitations", {
  id: serial("id").primaryKey(),
  teamId: integer("team_id")
    .notNull()
    .references(() => teams.id),
  email: varchar("email", { length: 255 }).notNull(),
  role: varchar("role", { length: 50 }).notNull(),
  invitedBy: integer("invited_by")
    .notNull()
    .references(() => users.id),
  invitedAt: timestamp("invited_at").notNull().defaultNow(),
  status: varchar("status", { length: 20 }).notNull().default("pending"),
});

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

export const provinces = pgTable("provinces", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }),
  slug: varchar("slug", { length: 200 }),
});

export const cities = pgTable("cities", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }),
  slug: varchar("slug", { length: 200 }),
  provinceId: integer("province_id").references(() => provinces.id),
});

export const teamsRelations = relations(teams, ({ many }) => ({
  teamMembers: many(teamMembers),
  activityLogs: many(activityLogs),
  invitations: many(invitations),
}));

export const usersRelations = relations(users, ({ many }) => ({
  teamMembers: many(teamMembers),
  invitationsSent: many(invitations),
}));

export const invitationsRelations = relations(invitations, ({ one }) => ({
  team: one(teams, {
    fields: [invitations.teamId],
    references: [teams.id],
  }),
  invitedBy: one(users, {
    fields: [invitations.invitedBy],
    references: [users.id],
  }),
}));

export const teamMembersRelations = relations(teamMembers, ({ one }) => ({
  user: one(users, {
    fields: [teamMembers.userId],
    references: [users.id],
  }),
  team: one(teams, {
    fields: [teamMembers.teamId],
    references: [teams.id],
  }),
}));

export const activityLogsRelations = relations(activityLogs, ({ one }) => ({
  team: one(teams, {
    fields: [activityLogs.teamId],
    references: [teams.id],
  }),
  user: one(users, {
    fields: [activityLogs.userId],
    references: [users.id],
  }),
}));

export const carsRelations = relations(cars, ({ one }) => ({
  model: one(models, {
    fields: [cars.modelId],
    references: [models.id],
  }),
  city: one(cities, {
    fields: [cars.cityId],
    references: [cities.id],
  }),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Team = typeof teams.$inferSelect;
export type NewTeam = typeof teams.$inferInsert;
export type TeamMember = typeof teamMembers.$inferSelect;
export type NewTeamMember = typeof teamMembers.$inferInsert;
export type ActivityLog = typeof activityLogs.$inferSelect;
export type NewActivityLog = typeof activityLogs.$inferInsert;
export type Invitation = typeof invitations.$inferSelect;
export type NewInvitation = typeof invitations.$inferInsert;
export type Car = typeof cars.$inferSelect;
export type TeamDataWithMembers = Team & {
  teamMembers: (TeamMember & {
    user: Pick<User, "id" | "name" | "email">;
  })[];
};

export enum ActivityType {
  SIGN_UP = "SIGN_UP",
  SIGN_IN = "SIGN_IN",
  SIGN_OUT = "SIGN_OUT",
  UPDATE_PASSWORD = "UPDATE_PASSWORD",
  DELETE_ACCOUNT = "DELETE_ACCOUNT",
  UPDATE_ACCOUNT = "UPDATE_ACCOUNT",
  CREATE_TEAM = "CREATE_TEAM",
  REMOVE_TEAM_MEMBER = "REMOVE_TEAM_MEMBER",
  INVITE_TEAM_MEMBER = "INVITE_TEAM_MEMBER",
  ACCEPT_INVITATION = "ACCEPT_INVITATION",
}
