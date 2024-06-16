CREATE TABLE IF NOT EXISTS "priorities" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "roles" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "status" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tickets" (
	"id" text PRIMARY KEY NOT NULL,
	"reference" serial NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"user_id" text,
	"status_id" integer,
	"priority_id" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tickets" ADD CONSTRAINT "tickets_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tickets" ADD CONSTRAINT "tickets_status_id_status_id_fk" FOREIGN KEY ("status_id") REFERENCES "public"."status"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tickets" ADD CONSTRAINT "tickets_priority_id_priorities_id_fk" FOREIGN KEY ("priority_id") REFERENCES "public"."priorities"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "role";