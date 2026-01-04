ALTER TABLE "parking_slots" ALTER COLUMN "slot_number" SET DATA TYPE varchar(20);--> statement-breakpoint
ALTER TABLE "parking_slots" ALTER COLUMN "slot_number" DROP DEFAULT;