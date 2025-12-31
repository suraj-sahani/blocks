ALTER TABLE "ev_station_schedules" DROP CONSTRAINT "ev_station_schedules_ev_station_id_day_of_week_pk";--> statement-breakpoint
ALTER TABLE "parking_area_schedules" DROP CONSTRAINT "parking_area_schedules_parking_area_id_day_of_week_pk";--> statement-breakpoint
CREATE UNIQUE INDEX "unq_ev_station_day" ON "ev_station_schedules" USING btree ("ev_station_id","day_of_week");--> statement-breakpoint
CREATE UNIQUE INDEX "unq_parking_area_day" ON "parking_area_schedules" USING btree ("parking_area_id","day_of_week");