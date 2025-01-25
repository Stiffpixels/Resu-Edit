CREATE TABLE `account` (
	`userId` text NOT NULL,
	`type` text NOT NULL,
	`provider` text NOT NULL,
	`providerAccountId` text NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` integer,
	`token_type` text,
	`scope` text,
	`id_token` text,
	`session_state` text,
	PRIMARY KEY(`provider`, `providerAccountId`),
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `authenticator` (
	`credentialID` text NOT NULL,
	`userId` text NOT NULL,
	`providerAccountId` text NOT NULL,
	`credentialPublicKey` text NOT NULL,
	`counter` integer NOT NULL,
	`credentialDeviceType` text NOT NULL,
	`credentialBackedUp` integer NOT NULL,
	`transports` text,
	PRIMARY KEY(`userId`, `credentialID`),
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `files` (
	`id` text(12),
	`key` text(255),
	`user_id` text(12),
	PRIMARY KEY(`id`, `key`),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `placeholders` (
	`file_id` text,
	`name` text(255),
	`type` text(255) NOT NULL,
	PRIMARY KEY(`file_id`, `name`),
	FOREIGN KEY (`file_id`) REFERENCES `files`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text(12) PRIMARY KEY NOT NULL,
	`name` text(255) NOT NULL,
	`email` text(255) NOT NULL,
	`image` text,
	`emailVerified` integer,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer
);
--> statement-breakpoint
CREATE TABLE `verificationToken` (
	`identifier` text NOT NULL,
	`token` text NOT NULL,
	`expires` integer NOT NULL,
	PRIMARY KEY(`identifier`, `token`)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `authenticator_credentialID_unique` ON `authenticator` (`credentialID`);--> statement-breakpoint
CREATE UNIQUE INDEX `placeholders_type_unique` ON `placeholders` (`type`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_name_unique` ON `users` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `users` (`name`);