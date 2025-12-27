ALTER TABLE "users" RENAME COLUMN "profile_picture_url" TO "image";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "email_verified" boolean DEFAULT false NOT NULL;