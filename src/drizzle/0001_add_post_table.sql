CREATE TABLE `post` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`images` text DEFAULT '[]',
	`created_at` integer,
	`updated_at` integer
);
