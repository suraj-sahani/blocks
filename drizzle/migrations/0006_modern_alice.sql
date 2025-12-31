CREATE TYPE "public"."day_of_week" AS ENUM('sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday');--> statement-breakpoint
CREATE TABLE "ev_station_schedules" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"ev_station_id" uuid NOT NULL,
	"day_of_week" "day_of_week" NOT NULL,
	"opening_time" time,
	"closing_time" time,
	"is_closed" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "ev_station_schedules_ev_station_id_day_of_week_pk" PRIMARY KEY("ev_station_id","day_of_week")
);
--> statement-breakpoint
CREATE TABLE "parking_area_schedules" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"parking_area_id" uuid NOT NULL,
	"day_of_week" "day_of_week" NOT NULL,
	"opening_time" time,
	"closing_time" time,
	"is_closed" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "parking_area_schedules_parking_area_id_day_of_week_pk" PRIMARY KEY("parking_area_id","day_of_week")
);
--> statement-breakpoint
ALTER TABLE "ev_station_schedules" ADD CONSTRAINT "ev_station_schedules_ev_station_id_ev_stations_id_fk" FOREIGN KEY ("ev_station_id") REFERENCES "public"."ev_stations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "parking_area_schedules" ADD CONSTRAINT "parking_area_schedules_parking_area_id_parking_areas_id_fk" FOREIGN KEY ("parking_area_id") REFERENCES "public"."parking_areas"("id") ON DELETE cascade ON UPDATE no action;