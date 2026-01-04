CREATE TABLE "parking_slot_vehicle_types" (
	"parking_slot_id" uuid NOT NULL,
	"vehicle_type_id" uuid NOT NULL,
	"price_per_hour" numeric(10, 2) NOT NULL,
	"price_per_day" numeric(10, 2) DEFAULT '0.00',
	"price_per_week" numeric(10, 2) DEFAULT '0.00',
	"price_per_month" numeric(10, 2) DEFAULT '0.00',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "parking_slot_vehicle_types_parking_slot_id_vehicle_type_id_pk" PRIMARY KEY("parking_slot_id","vehicle_type_id")
);
--> statement-breakpoint
CREATE TABLE "vehicle_types" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256) NOT NULL,
	"description" varchar(512),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "vehicle_types_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "parking_slot_prices" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "parking_slot_prices" CASCADE;--> statement-breakpoint
ALTER TABLE "parking_slots" ALTER COLUMN "slot_number" SET DATA TYPE integer USING "slot_number"::integer;--> statement-breakpoint
ALTER TABLE "parking_slots" ALTER COLUMN "slot_number" SET DEFAULT nextval('parking_slots_slot_number_seq'::regclass);--> statement-breakpoint
ALTER TABLE "parking_slot_vehicle_types" ADD CONSTRAINT "parking_slot_vehicle_types_parking_slot_id_parking_slots_id_fk" FOREIGN KEY ("parking_slot_id") REFERENCES "public"."parking_slots"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "parking_slot_vehicle_types" ADD CONSTRAINT "parking_slot_vehicle_types_vehicle_type_id_vehicle_types_id_fk" FOREIGN KEY ("vehicle_type_id") REFERENCES "public"."vehicle_types"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "unq_parking_area_slot_number" ON "parking_slots" USING btree ("parking_area_id","slot_number");--> statement-breakpoint
ALTER TABLE "parking_slots" DROP COLUMN "floor";--> statement-breakpoint
ALTER TABLE "parking_slots" DROP COLUMN "type";
