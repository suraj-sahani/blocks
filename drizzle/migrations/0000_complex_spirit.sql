CREATE TYPE "public"."booking_status" AS ENUM('pending', 'approved', 'rejected', 'cancelled', 'completed');--> statement-breakpoint
CREATE TYPE "public"."payment_method" AS ENUM('card', 'cash');--> statement-breakpoint
CREATE TYPE "public"."payment_status" AS ENUM('pending', 'requires_action', 'processing', 'authorized', 'failed', 'canceled', 'succeeded');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text,
	"email" text NOT NULL,
	"image_url" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"password" text NOT NULL,
	"terms_conditions" boolean DEFAULT false,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "amenities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "parking_area_amenities" (
	"parking_area_id" uuid,
	"amenities_id" uuid
);
--> statement-breakpoint
CREATE TABLE "parking_area_images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"image_url" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"parking_area_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "parking_area_slot" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"parking_area_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "parking_area" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"address_line_1" text NOT NULL,
	"address_line_2" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"description" text,
	"name" text NOT NULL,
	"latitude" double precision NOT NULL,
	"longitude" double precision NOT NULL,
	"total_slots" integer NOT NULL,
	"state_id" uuid NOT NULL,
	"city_id" uuid NOT NULL,
	"host_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "booking" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"slot_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"parking_area_id" uuid NOT NULL,
	"booking_status" "booking_status" DEFAULT 'pending',
	"payment_status" "payment_status" DEFAULT 'pending',
	"start_time" timestamp with time zone NOT NULL,
	"end_time" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payment" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"booking_id" uuid NOT NULL,
	"amount" double precision NOT NULL,
	"payment_method" "payment_method" NOT NULL,
	"payment_status" "payment_status" DEFAULT 'pending'
);
--> statement-breakpoint
CREATE TABLE "state" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"state_code" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "city" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"state_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "parking_area_amenities" ADD CONSTRAINT "parking_area_amenities_parking_area_id_parking_area_id_fk" FOREIGN KEY ("parking_area_id") REFERENCES "public"."parking_area"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "parking_area_amenities" ADD CONSTRAINT "parking_area_amenities_amenities_id_amenities_id_fk" FOREIGN KEY ("amenities_id") REFERENCES "public"."amenities"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "parking_area_images" ADD CONSTRAINT "parking_area_images_parking_area_id_parking_area_id_fk" FOREIGN KEY ("parking_area_id") REFERENCES "public"."parking_area"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "parking_area_slot" ADD CONSTRAINT "parking_area_slot_parking_area_id_parking_area_id_fk" FOREIGN KEY ("parking_area_id") REFERENCES "public"."parking_area"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "parking_area" ADD CONSTRAINT "parking_area_state_id_state_id_fk" FOREIGN KEY ("state_id") REFERENCES "public"."state"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "parking_area" ADD CONSTRAINT "parking_area_city_id_city_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."city"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "parking_area" ADD CONSTRAINT "parking_area_host_id_users_id_fk" FOREIGN KEY ("host_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "booking" ADD CONSTRAINT "booking_slot_id_parking_area_slot_id_fk" FOREIGN KEY ("slot_id") REFERENCES "public"."parking_area_slot"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "booking" ADD CONSTRAINT "booking_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "booking" ADD CONSTRAINT "booking_parking_area_id_parking_area_id_fk" FOREIGN KEY ("parking_area_id") REFERENCES "public"."parking_area"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payment" ADD CONSTRAINT "payment_booking_id_booking_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."booking"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "city" ADD CONSTRAINT "city_state_id_state_id_fk" FOREIGN KEY ("state_id") REFERENCES "public"."state"("id") ON DELETE no action ON UPDATE no action;