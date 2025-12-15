DROP INDEX "session_token_unique";--> statement-breakpoint
DROP INDEX "user_email_unique";--> statement-breakpoint
DROP INDEX "unique_box";--> statement-breakpoint
ALTER TABLE `boxes` ALTER COLUMN "created_at" TO "created_at" text DEFAULT 'Mon Dec 15 2025 11:07:42 GMT-0300 (Horário Padrão de Brasília)';--> statement-breakpoint
CREATE UNIQUE INDEX `session_token_unique` ON `session` (`token`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `unique_box` ON `boxes` (`user_id`,`slug`,`author_namespace`);--> statement-breakpoint
ALTER TABLE `boxes` ADD `total_links` integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE `links` ALTER COLUMN "created_at" TO "created_at" text DEFAULT 'Mon Dec 15 2025 11:07:42 GMT-0300 (Horário Padrão de Brasília)';