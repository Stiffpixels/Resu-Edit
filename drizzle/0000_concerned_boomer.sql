CREATE TABLE `files` (
	`id` text(12),
	`key` text(255),
	`url` text(255) NOT NULL,
	`placeholders_id` text,
	PRIMARY KEY(`id`, `key`)
);
--> statement-breakpoint
CREATE TABLE `placeholders` (
	`id` text(12),
	`name` text(255),
	`type` text(255) NOT NULL,
	PRIMARY KEY(`id`, `name`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text(12),
	`name` text(255) NOT NULL,
	`email` text(255) NOT NULL,
	`files_id` text(12),
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `placeholders_type_unique` ON `placeholders` (`type`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_name_unique` ON `users` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `users` (`name`);