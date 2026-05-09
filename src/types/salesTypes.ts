import type { Database } from "../lib/database.types";
export type SalesEntry = Database["public"]["Tables"]["inventory"]["Row"];
export type FormData = Record<string, string | number>