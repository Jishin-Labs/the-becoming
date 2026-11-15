ALTER TABLE "testimonials" ADD COLUMN "service" varchar(80);--> statement-breakpoint
ALTER TABLE "testimonials" ADD COLUMN "featured" boolean DEFAULT false NOT NULL;