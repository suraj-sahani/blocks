CREATE TABLE "connectors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"description" text NOT NULL,
	"image_url" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ev_charging_images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"ev_charging_id" uuid NOT NULL,
	"image_url" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ev_charging_slot" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"ev_charging_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ev_charging" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"description" text,
	"name" text NOT NULL,
	"latitude" double precision NOT NULL,
	"longitude" double precision NOT NULL,
	"address_line_1" text NOT NULL,
	"address_line_2" text,
	"total_slots" integer NOT NULL,
	"state_id" uuid NOT NULL,
	"city_id" uuid NOT NULL,
	"host_id" uuid NOT NULL,
	"charging_station_power" text NOT NULL,
	"charging_station_price" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ev_charging_to_connectors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"ev_charging_id" uuid NOT NULL,
	"connector_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "ev_charging_images" ADD CONSTRAINT "ev_charging_images_ev_charging_id_ev_charging_id_fk" FOREIGN KEY ("ev_charging_id") REFERENCES "public"."ev_charging"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ev_charging_slot" ADD CONSTRAINT "ev_charging_slot_ev_charging_id_ev_charging_id_fk" FOREIGN KEY ("ev_charging_id") REFERENCES "public"."ev_charging"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ev_charging" ADD CONSTRAINT "ev_charging_state_id_state_id_fk" FOREIGN KEY ("state_id") REFERENCES "public"."state"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ev_charging" ADD CONSTRAINT "ev_charging_city_id_city_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."city"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ev_charging" ADD CONSTRAINT "ev_charging_host_id_users_id_fk" FOREIGN KEY ("host_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ev_charging_to_connectors" ADD CONSTRAINT "ev_charging_to_connectors_ev_charging_id_ev_charging_id_fk" FOREIGN KEY ("ev_charging_id") REFERENCES "public"."ev_charging"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ev_charging_to_connectors" ADD CONSTRAINT "ev_charging_to_connectors_connector_id_connectors_id_fk" FOREIGN KEY ("connector_id") REFERENCES "public"."connectors"("id") ON DELETE no action ON UPDATE no action;