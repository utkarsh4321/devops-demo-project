const { drizzle } = require("drizzle-orm/mysql2");
const mysql = require("mysql2/promise");
const { migrate } = require("drizzle-orm/mysql2/migrator");
const { countries } = require("./schema");
require("dotenv").config();

console.log(
  "dotenv",
  process.env.DB_HOST,
  process.env.DB_USERNAME,
  process.env.DB_DATABASE,
  process.env.DB_PORT
);
async function main() {
  try {
    // Initialize MySQL connection
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      port: process.env.DB_PORT,
    });

    // Initialize Drizzle ORM
    const db = drizzle(connection);

    // Run migrations
    console.log("Running migrations...");
    await migrate(db, { migrationsFolder: "./drizzle" });
    console.log("Migrations applied successfully");

    // Seed dummy data
    const dummyCountries = [
      { name: "United States", code: "US", population: 331000000 },
      { name: "India", code: "IN", population: 1380000000 },
      { name: "Brazil", code: "BR", population: 212000000 },
      { name: "Japan", code: "JP", population: 125000000 },
      { name: "Nigeria", code: "NG", population: 206000000 },
      { name: "Canada", code: "CA", population: 38000000 },
      { name: "Germany", code: "DE", population: 83000000 },
      { name: "Australia", code: "AU", population: 26000000 },
      { name: "South Africa", code: "ZA", population: 60000000 },
      { name: "Mexico", code: "MX", population: 128000000 },
      { name: "China", code: "CN", population: 1440000000 },
      { name: "Indonesia", code: "ID", population: 276000000 },
    ];

    // Check if table is empty to avoid duplicate seeding
    const existing = await db.select().from(countries);
    if (existing.length === 0) {
      await db.insert(countries).values(dummyCountries);
      console.log("Seeded countries:", dummyCountries.length);
    } else {
      console.log("Table already contains data, skipping seeding");
    }

    // Close connection
    await connection.end();
  } catch (error) {
    console.error("Migration or seeding failed:", error);
    process.exit(1);
  }
}

main();
