ALTER TYPE "public"."ev_connector_type" ADD VALUE 'nacs' BEFORE 'other';--> statement-breakpoint
ALTER TYPE "public"."ev_connector_type" ADD VALUE 'j1772' BEFORE 'other';--> statement-breakpoint
ALTER TABLE "ev_stations" RENAME COLUMN "total_connectors" TO "total_slots";