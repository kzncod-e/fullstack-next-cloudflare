import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// --- Sessions ---
export const sessions = sqliteTable("agent_activity", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  sessionId: text("session_id").notNull().unique(),
  agentName: text("agent_name").notNull(),
  platform: text("platform").notNull(),
  startTime: text("start_time"),
  endTime: text("end_time"),
  status: text("status"),
  totalActions: integer("total_actions"),
  successRate: text("success_rate"),
  notes: text("notes"),
});

// --- Activities ---
export const activities = sqliteTable("activities", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  sessionId: text("session_id")
    .notNull()
    .references(() => sessions.sessionId),
  type: text("type").notNull(),
  status: text("status"),
  timestamp: text("timestamp"),
  details: text("details"),
});

// --- Posts created by agent ---
export const posts = sqliteTable("posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  activityId: integer("activity_id")
    .notNull()
    .references(() => activities.id),
  postId: text("post_id"),
  title: text("title"),
  caption: text("caption"),
  link: text("link"),
});

// --- Liked posts ---
export const likedPosts = sqliteTable("liked_posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  activityId: integer("activity_id")
    .notNull()
    .references(() => activities.id),
  postId: text("post_id"),
  title: text("title"),
  author: text("author"),
});

// --- Saved posts ---
export const savedPosts = sqliteTable("saved_posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  activityId: integer("activity_id")
    .notNull()
    .references(() => activities.id),
  postId: text("post_id"),
  title: text("title"),
});

// --- Viewed posts ---
export const viewedPosts = sqliteTable("viewed_posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  activityId: integer("activity_id")
    .notNull()
    .references(() => activities.id),
  postId: text("post_id"),
  title: text("title"),
  author: text("author"),
});

// --- Watched videos ---
export const videos = sqliteTable("videos", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  activityId: integer("activity_id")
    .notNull()
    .references(() => activities.id),
  videoId: text("video_id"),
  title: text("title"),
  duration: text("duration"),
});

// --- Commented posts ---
export const commentedPosts = sqliteTable("commented_posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  activityId: integer("activity_id")
    .notNull()
    .references(() => activities.id),
  postId: text("post_id"),
  title: text("title"),
  author: text("author"),
  comment: text("comment"),
});

// --- Followed accounts ---
export const followedAccounts = sqliteTable("followed_accounts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  activityId: integer("activity_id")
    .notNull()
    .references(() => activities.id),
  username: text("username"),
  name: text("name"),
});
