ALTER TABLE "ev_charging_slots" RENAME TO "ev_station_slots";--> statement-breakpoint
ALTER TABLE "parking_slots" RENAME TO "parking_area_slots";--> statement-breakpoint
ALTER TABLE "ev_station_slots" DROP CONSTRAINT "ev_charging_slots_ev_station_id_ev_stations_id_fk";
--> statement-breakpoint
ALTER TABLE "parking_slot_vehicle_types" DROP CONSTRAINT "parking_slot_vehicle_types_parking_slot_id_parking_slots_id_fk";
--> statement-breakpoint
ALTER TABLE "parking_area_slots" DROP CONSTRAINT "parking_slots_parking_area_id_parking_areas_id_fk";
--> statement-breakpoint
ALTER TABLE "ev_charging_bookings" DROP CONSTRAINT "ev_charging_bookings_ev_charging_slot_id_ev_charging_slots_id_fk";
--> statement-breakpoint
ALTER TABLE "parking_bookings" DROP CONSTRAINT "parking_bookings_parking_slot_id_parking_slots_id_fk";
--> statement-breakpoint
ALTER TABLE "ev_station_slots" ADD COLUMN "price_per_kwh" numeric(5, 2) NOT NULL;--> statement-breakpoint
ALTER TABLE "ev_station_slots" ADD CONSTRAINT "ev_station_slots_ev_station_id_ev_stations_id_fk" FOREIGN KEY ("ev_station_id") REFERENCES "public"."ev_stations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "parking_slot_vehicle_types" ADD CONSTRAINT "parking_slot_vehicle_types_parking_slot_id_parking_area_slots_id_fk" FOREIGN KEY ("parking_slot_id") REFERENCES "public"."parking_area_slots"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "parking_area_slots" ADD CONSTRAINT "parking_area_slots_parking_area_id_parking_areas_id_fk" FOREIGN KEY ("parking_area_id") REFERENCES "public"."parking_areas"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ev_charging_bookings" ADD CONSTRAINT "ev_charging_bookings_ev_charging_slot_id_ev_station_slots_id_fk" FOREIGN KEY ("ev_charging_slot_id") REFERENCES "public"."ev_station_slots"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "parking_bookings" ADD CONSTRAINT "parking_bookings_parking_slot_id_parking_area_slots_id_fk" FOREIGN KEY ("parking_slot_id") REFERENCES "public"."parking_area_slots"("id") ON DELETE cascade ON UPDATE no action;