import { sql } from "drizzle-orm";
import {
  timestamp,
  serial,
  pgTable,
  doublePrecision,
} from "drizzle-orm/pg-core";

export const radonGwl = pgTable("radon_gwl", {
  id: serial("id").primaryKey().notNull(),
  radon_concentration: doublePrecision("radon_concentration"),
  ground_water_level: doublePrecision("ground_water_level"),
  createdAt: timestamp("createdAt")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updatedAt")
    .notNull()
    .default(sql`now()`),
});
