CREATE TYPE "public"."ev_charging_level" AS ENUM('level_1', 'level_2', 'dc_fast');--> statement-breakpoint
CREATE TYPE "public"."ev_connector_type" AS ENUM('type_1', 'type_2', 'combo_ccs_1', 'combo_ccs_2', 'chademo', 'tesla_supercharger', 'other');--> statement-breakpoint
CREATE TYPE "public"."parking_slot_type" AS ENUM('standard', 'accessible', 'compact', 'ev_reserved', 'motorcycle');--> statement-breakpoint
CREATE TYPE "public"."vehicle_body_type" AS ENUM('sedan', 'suv', 'truck', 'van', 'hatchback', 'coupe', 'motorcycle', 'other');--> statement-breakpoint
CREATE TYPE "public"."payment_status" AS ENUM('requires_payment_method', 'requires_confirmation', 'requires_action', 'processing', 'succeeded', 'canceled', 'failed');--> statement-breakpoint
CREATE TABLE "amenities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ev_charging_slots" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"ev_station_id" uuid NOT NULL,
	"slot_number" varchar(20) NOT NULL,
	"connector_type" "ev_connector_type" NOT NULL,
	"charging_level" "ev_charging_level" NOT NULL,
	"max_power_kw" numeric(5, 2) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ev_station_amenities" (
	"ev_station_id" uuid NOT NULL,
	"amenity_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ev_station_images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"ev_station_id" uuid NOT NULL,
	"url" varchar(1024) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ev_stations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"name" varchar(256) NOT NULL,
	"address" varchar(512) NOT NULL,
	"city" varchar(256) NOT NULL,
	"state" varchar(256) NOT NULL,
	"zip_code" varchar(10) NOT NULL,
	"latitude" numeric(10, 7),
	"longitude" numeric(10, 7),
	"description" varchar(1024),
	"connector_type" "ev_connector_type" NOT NULL,
	"charging_level" "ev_charging_level" NOT NULL,
	"max_power_kw" numeric(5, 2) NOT NULL,
	"price_per_kwh" numeric(10, 3) NOT NULL,
	"total_connectors" smallint DEFAULT 1 NOT NULL,
	"available_connectors" smallint DEFAULT 0 NOT NULL,
	"opening_time" varchar(5),
	"closing_time" varchar(5),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "parking_area_amenities" (
	"parking_area_id" uuid NOT NULL,
	"amenity_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "parking_area_images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"parking_area_id" uuid NOT NULL,
	"url" varchar(1024) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "parking_areas" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"name" varchar(256) NOT NULL,
	"address" varchar(512) NOT NULL,
	"city" varchar(256) NOT NULL,
	"state" varchar(256) NOT NULL,
	"zip_code" varchar(10) NOT NULL,
	"latitude" numeric(10, 7),
	"longitude" numeric(10, 7),
	"total_slots" integer DEFAULT 0 NOT NULL,
	"description" varchar(1024),
	"opening_time" varchar(5) NOT NULL,
	"closing_time" varchar(5) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "parking_slot_prices" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"parking_slot_id" uuid NOT NULL,
	"vehicle_body_type" "vehicle_body_type" NOT NULL,
	"price_per_hour" numeric(10, 2) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "parking_slots" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"parking_area_id" uuid NOT NULL,
	"slot_number" varchar(20) NOT NULL,
	"floor" varchar(10),
	"type" "parking_slot_type" DEFAULT 'standard' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ev_charging_bookings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"user_vehicle_id" uuid NOT NULL,
	"ev_station_id" uuid NOT NULL,
	"ev_charging_slot_id" uuid NOT NULL,
	"connector_type_used" "ev_connector_type" NOT NULL,
	"start_time" timestamp NOT NULL,
	"end_time" timestamp,
	"actual_start_time" timestamp,
	"actual_end_time" timestamp,
	"energy_consumed_kwh" numeric(10, 3),
	"total_cost" numeric(10, 2),
	"status" varchar(50) DEFAULT 'confirmed' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "parking_bookings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"user_vehicle_id" uuid NOT NULL,
	"parking_area_id" uuid NOT NULL,
	"parking_slot_id" uuid NOT NULL,
	"vehicle_body_type" "vehicle_body_type" NOT NULL,
	"start_time" timestamp NOT NULL,
	"end_time" timestamp NOT NULL,
	"actual_check_in" timestamp,
	"actual_check_out" timestamp,
	"total_cost" numeric(10, 2),
	"status" varchar(50) DEFAULT 'confirmed' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"amount" numeric(12, 2) NOT NULL,
	"currency" varchar(3) DEFAULT 'USD' NOT NULL,
	"payment_intent_id" varchar(256) NOT NULL,
	"status" "payment_status" DEFAULT 'requires_payment_method' NOT NULL,
	"payment_method_type" varchar(50),
	"receipt_url" varchar(512),
	"parking_booking_id" uuid,
	"ev_charging_booking_id" uuid,
	"payment_date" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "payments_payment_intent_id_unique" UNIQUE("payment_intent_id")
);
--> statement-breakpoint
CREATE TABLE "user_images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"url" varchar(1024) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_vehicle_images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_vehicle_id" uuid NOT NULL,
	"url" varchar(1024) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_vehicles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"make" varchar(256) NOT NULL,
	"model" varchar(256) NOT NULL,
	"year" integer,
	"license_plate" varchar(20) NOT NULL,
	"vin" varchar(17),
	"color" varchar(50),
	"body_type" "vehicle_body_type" NOT NULL,
	"ev_primary_connector" "ev_connector_type",
	"is_default" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_vehicles_license_plate_unique" UNIQUE("license_plate"),
	CONSTRAINT "user_vehicles_vin_unique" UNIQUE("vin")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(256) NOT NULL,
	"password" varchar(256),
	"provider" varchar(50),
	"first_name" varchar(256),
	"last_name" varchar(256),
	"phone_number" varchar(20),
	"profile_picture_url" varchar(512),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "ev_charging_slots" ADD CONSTRAINT "ev_charging_slots_ev_station_id_ev_stations_id_fk" FOREIGN KEY ("ev_station_id") REFERENCES "public"."ev_stations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ev_station_amenities" ADD CONSTRAINT "ev_station_amenities_ev_station_id_ev_stations_id_fk" FOREIGN KEY ("ev_station_id") REFERENCES "public"."ev_stations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ev_station_amenities" ADD CONSTRAINT "ev_station_amenities_amenity_id_amenities_id_fk" FOREIGN KEY ("amenity_id") REFERENCES "public"."amenities"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ev_station_images" ADD CONSTRAINT "ev_station_images_ev_station_id_ev_stations_id_fk" FOREIGN KEY ("ev_station_id") REFERENCES "public"."ev_stations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ev_stations" ADD CONSTRAINT "ev_stations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "parking_area_amenities" ADD CONSTRAINT "parking_area_amenities_parking_area_id_parking_areas_id_fk" FOREIGN KEY ("parking_area_id") REFERENCES "public"."parking_areas"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "parking_area_amenities" ADD CONSTRAINT "parking_area_amenities_amenity_id_amenities_id_fk" FOREIGN KEY ("amenity_id") REFERENCES "public"."amenities"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "parking_area_images" ADD CONSTRAINT "parking_area_images_parking_area_id_parking_areas_id_fk" FOREIGN KEY ("parking_area_id") REFERENCES "public"."parking_areas"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "parking_areas" ADD CONSTRAINT "parking_areas_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "parking_slot_prices" ADD CONSTRAINT "parking_slot_prices_parking_slot_id_parking_slots_id_fk" FOREIGN KEY ("parking_slot_id") REFERENCES "public"."parking_slots"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "parking_slots" ADD CONSTRAINT "parking_slots_parking_area_id_parking_areas_id_fk" FOREIGN KEY ("parking_area_id") REFERENCES "public"."parking_areas"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ev_charging_bookings" ADD CONSTRAINT "ev_charging_bookings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ev_charging_bookings" ADD CONSTRAINT "ev_charging_bookings_user_vehicle_id_user_vehicles_id_fk" FOREIGN KEY ("user_vehicle_id") REFERENCES "public"."user_vehicles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ev_charging_bookings" ADD CONSTRAINT "ev_charging_bookings_ev_station_id_ev_stations_id_fk" FOREIGN KEY ("ev_station_id") REFERENCES "public"."ev_stations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ev_charging_bookings" ADD CONSTRAINT "ev_charging_bookings_ev_charging_slot_id_ev_charging_slots_id_fk" FOREIGN KEY ("ev_charging_slot_id") REFERENCES "public"."ev_charging_slots"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "parking_bookings" ADD CONSTRAINT "parking_bookings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "parking_bookings" ADD CONSTRAINT "parking_bookings_user_vehicle_id_user_vehicles_id_fk" FOREIGN KEY ("user_vehicle_id") REFERENCES "public"."user_vehicles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "parking_bookings" ADD CONSTRAINT "parking_bookings_parking_area_id_parking_areas_id_fk" FOREIGN KEY ("parking_area_id") REFERENCES "public"."parking_areas"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "parking_bookings" ADD CONSTRAINT "parking_bookings_parking_slot_id_parking_slots_id_fk" FOREIGN KEY ("parking_slot_id") REFERENCES "public"."parking_slots"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_parking_booking_id_parking_bookings_id_fk" FOREIGN KEY ("parking_booking_id") REFERENCES "public"."parking_bookings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_ev_charging_booking_id_ev_charging_bookings_id_fk" FOREIGN KEY ("ev_charging_booking_id") REFERENCES "public"."ev_charging_bookings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_images" ADD CONSTRAINT "user_images_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_vehicle_images" ADD CONSTRAINT "user_vehicle_images_user_vehicle_id_user_vehicles_id_fk" FOREIGN KEY ("user_vehicle_id") REFERENCES "public"."user_vehicles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_vehicles" ADD CONSTRAINT "user_vehicles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;