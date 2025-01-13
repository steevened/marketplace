CREATE TABLE "car_comfort_features" (
	"id" serial PRIMARY KEY NOT NULL,
	"car_id" integer NOT NULL,
	"has_air_conditioning" boolean,
	"has_cruise_control" boolean,
	"has_leather_seats" boolean,
	CONSTRAINT "car_comfort_features_car_id_unique" UNIQUE("car_id")
);
--> statement-breakpoint
CREATE TABLE "car_images" (
	"id" serial PRIMARY KEY NOT NULL,
	"car_id" integer NOT NULL,
	"url" varchar(500) NOT NULL,
	"is_primary" boolean DEFAULT false,
	"order" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "car_pricing_info" (
	"id" serial PRIMARY KEY NOT NULL,
	"car_id" integer NOT NULL,
	"price" numeric(10, 2),
	"negotiable" boolean,
	"price_history" jsonb,
	CONSTRAINT "car_pricing_info_car_id_unique" UNIQUE("car_id")
);
--> statement-breakpoint
CREATE TABLE "car_specs" (
	"id" serial PRIMARY KEY NOT NULL,
	"car_id" integer NOT NULL,
	"color" varchar(50),
	"description" text,
	"unique_owner" boolean,
	CONSTRAINT "car_specs_car_id_unique" UNIQUE("car_id")
);
--> statement-breakpoint
CREATE TABLE "car_technical_details" (
	"id" serial PRIMARY KEY NOT NULL,
	"car_id" integer NOT NULL,
	"mileage" integer,
	"fuel_type" varchar(50),
	"doors" integer,
	"transmission" varchar(50),
	"engine" varchar(100),
	"power_hp" integer,
	CONSTRAINT "car_technical_details_car_id_unique" UNIQUE("car_id")
);
--> statement-breakpoint
CREATE TABLE "cities" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100),
	"slug" varchar(200),
	"province_id" integer
);
--> statement-breakpoint
CREATE TABLE "countries" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100),
	"slug" varchar(200),
	"code" varchar(3)
);
--> statement-breakpoint
CREATE TABLE "provinces" (
	"id" serial PRIMARY KEY NOT NULL,
	"label" varchar(100),
	"name" varchar(100),
	"slug" varchar(200)
);
--> statement-breakpoint
ALTER TABLE "cars" DROP CONSTRAINT "cars_brand_id_brands_id_fk";
--> statement-breakpoint
ALTER TABLE "cars" DROP CONSTRAINT "cars_subtype_id_car_subtypes_id_fk";
--> statement-breakpoint
ALTER TABLE "cars" ADD COLUMN "city_id" integer;--> statement-breakpoint
ALTER TABLE "models" ADD COLUMN "subtype_id" integer;--> statement-breakpoint
ALTER TABLE "car_comfort_features" ADD CONSTRAINT "car_comfort_features_car_id_cars_id_fk" FOREIGN KEY ("car_id") REFERENCES "public"."cars"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "car_images" ADD CONSTRAINT "car_images_car_id_cars_id_fk" FOREIGN KEY ("car_id") REFERENCES "public"."cars"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "car_pricing_info" ADD CONSTRAINT "car_pricing_info_car_id_cars_id_fk" FOREIGN KEY ("car_id") REFERENCES "public"."cars"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "car_specs" ADD CONSTRAINT "car_specs_car_id_cars_id_fk" FOREIGN KEY ("car_id") REFERENCES "public"."cars"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "car_technical_details" ADD CONSTRAINT "car_technical_details_car_id_cars_id_fk" FOREIGN KEY ("car_id") REFERENCES "public"."cars"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cities" ADD CONSTRAINT "cities_province_id_provinces_id_fk" FOREIGN KEY ("province_id") REFERENCES "public"."provinces"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cars" ADD CONSTRAINT "cars_city_id_cities_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."cities"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "models" ADD CONSTRAINT "models_subtype_id_car_subtypes_id_fk" FOREIGN KEY ("subtype_id") REFERENCES "public"."car_subtypes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cars" DROP COLUMN "brand_id";--> statement-breakpoint
ALTER TABLE "cars" DROP COLUMN "subtype_id";