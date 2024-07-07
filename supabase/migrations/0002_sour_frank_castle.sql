CREATE TABLE IF NOT EXISTS "ai_configurations" (
	"id" serial PRIMARY KEY NOT NULL,
	"provider" text NOT NULL,
	"model" text NOT NULL,
	"ai_key_id" integer NOT NULL,
	"creator_id" uuid NOT NULL,
	"global" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ai_keys" (
	"id" serial PRIMARY KEY NOT NULL,
	"hashed_key" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ai_configurations" ADD CONSTRAINT "ai_configurations_ai_key_id_ai_keys_id_fk" FOREIGN KEY ("ai_key_id") REFERENCES "public"."ai_keys"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ai_configurations" ADD CONSTRAINT "ai_configurations_creator_id_users_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
