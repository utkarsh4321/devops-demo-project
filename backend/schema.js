const { mysqlTable, varchar, int, serial } = require("drizzle-orm/mysql-core");

// Define countries table schema
const countries = mysqlTable("countries", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  code: varchar("code", { length: 2 }).notNull().unique(),
  population: int("population").notNull(),
});

module.exports = { countries };
