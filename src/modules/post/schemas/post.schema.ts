
import { integer,sqliteTable, text } from "drizzle-orm/sqlite-core";


export const post = sqliteTable("post", {
    id: text("id").primaryKey(),
    title: text("name").notNull(),
    images: text("images").default("[]"),
    createdAt:integer("created_at",{mode:"timestamp"}),
    updatedAt:integer("updated_at",{mode:"timestamp"})
    
})