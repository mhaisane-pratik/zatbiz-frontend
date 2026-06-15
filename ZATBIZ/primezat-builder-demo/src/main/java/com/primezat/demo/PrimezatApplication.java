package com.primezat.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;

@SpringBootApplication
public class PrimezatApplication {

    public static void main(String[] args) {
        SpringApplication.run(PrimezatApplication.class, args);
    }

    @Bean
    public CommandLineRunner migrateDatabase(JdbcTemplate jdbcTemplate) {
        return args -> {
            try {
                System.out.println("Running database migrations and checking data shifts...");

                // 1. Ensure store_product image_url is TEXT
                try {
                    jdbcTemplate.execute("ALTER TABLE store_product ALTER COLUMN image_url TYPE TEXT");
                    System.out.println("Altered store_product.image_url to TEXT successfully.");
                } catch (Exception e) {
                    System.err.println("Note: Alter store_product.image_url skipped: " + e.getMessage());
                }

                // 2. Migrate app_user -> core_user
                migrateTable(jdbcTemplate, "app_user", "core_user", 
                    "INSERT INTO core_user (id, email, password, username) SELECT id, email, password, username FROM app_user ON CONFLICT (id) DO NOTHING", 
                    "core_user");

                // 3. Migrate project -> core_project
                migrateTable(jdbcTemplate, "project", "core_project", 
                    "INSERT INTO core_project (id, name, description, blocks_json, status, created_at, updated_at) SELECT id, name, description, blocks_json, status, created_at, updated_at FROM project ON CONFLICT (id) DO NOTHING", 
                    "core_project");

                // 4. Migrate product -> store_product
                migrateTable(jdbcTemplate, "product", "store_product", 
                    "INSERT INTO store_product (id, available, category, description, image_url, name, price, project_id, stock, variants, brand, color, discount, rating) SELECT id, available, category, description, image_url, name, price, project_id, stock, variants, brand, color, discount, rating FROM product ON CONFLICT (id) DO NOTHING", 
                    "store_product");

                // 5. Migrate customer_order -> store_order
                migrateTable(jdbcTemplate, "customer_order", "store_order",
                    "INSERT INTO store_order (id, project_id, customer_id, customer_name, customer_email, customer_phone, customer_address, items_json, subtotal, tax, total, status, payment_gateway, payment_status, invoice_number, payment_method, city, state, pincode, created_at, updated_at) SELECT id, project_id, customer_id, customer_name, customer_email, customer_phone, customer_address, items_json, subtotal, tax, total, status, payment_gateway, payment_status, invoice_number, payment_method, city, state, pincode, created_at, updated_at FROM customer_order ON CONFLICT (id) DO NOTHING",
                    "store_order");

                // 6. Migrate customer_reservation -> store_reservation
                migrateTable(jdbcTemplate, "customer_reservation", "store_reservation",
                    "INSERT INTO store_reservation (id, project_id, customer_name, customer_email, customer_phone, booking_date, booking_time, number_of_guests, table_number, status, notes, created_at) SELECT id, project_id, customer_name, customer_email, customer_phone, booking_date, booking_time, number_of_guests, table_number, status, notes, created_at FROM customer_reservation ON CONFLICT (id) DO NOTHING",
                    "store_reservation");

                System.out.println("Database migrations and data shifting completed successfully!");
            } catch (Exception e) {
                System.err.println("Database migration failed: " + e.getMessage());
            }
        };
    }

    private void migrateTable(JdbcTemplate jdbcTemplate, String oldTable, String newTable, String insertSql, String seqTable) {
        try {
            // Check if old table exists in public schema (standard for postgres/h2)
            Boolean oldExists = false;
            try {
                // Generic query that works for table check
                jdbcTemplate.execute("SELECT 1 FROM " + oldTable + " LIMIT 1");
                oldExists = true;
            } catch (Exception e) {
                // Table doesn't exist
            }

            if (oldExists) {
                // Check if new table has 0 rows
                Integer newCount = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM " + newTable, Integer.class);
                if (newCount != null && newCount == 0) {
                    // Check if old table has > 0 rows
                    Integer oldCount = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM " + oldTable, Integer.class);
                    if (oldCount != null && oldCount > 0) {
                        System.out.println("Migrating data from " + oldTable + " to " + newTable + " (" + oldCount + " rows)...");
                        jdbcTemplate.execute(insertSql);
                        System.out.println("Migrated " + oldTable + " data successfully.");

                        // Reset sequence (PostgreSQL only)
                        try {
                            jdbcTemplate.execute("SELECT setval(pg_get_serial_sequence('" + seqTable + "', 'id'), coalesce(max(id), 1)) FROM " + seqTable);
                            System.out.println("Reset sequence for " + seqTable + " successfully.");
                        } catch (Exception seqEx) {
                            System.out.println("Note: Reset sequence for " + seqTable + " skipped (might be non-serial ID or H2): " + seqEx.getMessage());
                        }
                    }
                } else {
                    System.out.println("Destination table " + newTable + " already has data, skipping migration.");
                }
            } else {
                System.out.println("Source table " + oldTable + " does not exist, skipping migration.");
            }
        } catch (Exception e) {
            System.err.println("Migration error for " + oldTable + " -> " + newTable + ": " + e.getMessage());
        }
    }

}