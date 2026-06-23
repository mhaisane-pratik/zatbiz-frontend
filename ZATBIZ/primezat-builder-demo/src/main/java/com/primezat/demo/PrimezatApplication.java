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
                if (tableExists(jdbcTemplate, "store_product")) {
                    if (columnExists(jdbcTemplate, "store_product", "image_url")) {
                        try {
                            jdbcTemplate.execute("ALTER TABLE store_product ALTER COLUMN image_url TYPE TEXT");
                            System.out.println("Altered store_product.image_url to TEXT successfully.");
                        } catch (Exception e) {
                            System.err.println("Note: Alter store_product.image_url skipped: " + e.getMessage());
                        }
                    }
                }

                // 1b. Ensure core_project links to core_user (required for per-account workspaces)
                if (tableExists(jdbcTemplate, "core_project")) {
                    if (!columnExists(jdbcTemplate, "core_project", "user_id")) {
                        try {
                            jdbcTemplate.execute("ALTER TABLE core_project ADD COLUMN user_id BIGINT");
                            System.out.println("Ensured core_project.user_id column exists.");
                        } catch (Exception e) {
                            System.err.println("Note: core_project.user_id migration skipped: " + e.getMessage());
                        }
                    }
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

                // 7. Seed admin user
                if (tableExists(jdbcTemplate, "core_user")) {
                    try {
                        Integer adminCount = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM core_user WHERE email = 'admin@gmail.com'", Integer.class);
                        String adminHashedPassword = org.mindrot.jbcrypt.BCrypt.hashpw("admin123", org.mindrot.jbcrypt.BCrypt.gensalt());
                        if (adminCount == null || adminCount == 0) {
                            System.out.println("Seeding admin user...");
                            jdbcTemplate.update("INSERT INTO core_user (username, email, password) VALUES (?, ?, ?)", 
                                "Administrator", "admin@gmail.com", adminHashedPassword);
                            System.out.println("Admin user seeded successfully!");
                        } else {
                            System.out.println("Admin user already exists. Updating password to admin123 to ensure fresh credentials...");
                            jdbcTemplate.update("UPDATE core_user SET password = ? WHERE email = 'admin@gmail.com'", adminHashedPassword);
                        }
                    } catch (Exception e) {
                        System.err.println("Note: Seeding admin user skipped: " + e.getMessage());
                    }
                }

                // 8. Seed demo user
                if (tableExists(jdbcTemplate, "core_user")) {
                    try {
                        Integer demoCount = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM core_user WHERE email = 'demo@zatbiz.com'", Integer.class);
                        String demoHashedPassword = org.mindrot.jbcrypt.BCrypt.hashpw("password123", org.mindrot.jbcrypt.BCrypt.gensalt());
                        if (demoCount == null || demoCount == 0) {
                            System.out.println("Seeding demo user...");
                            jdbcTemplate.update("INSERT INTO core_user (username, email, password) VALUES (?, ?, ?)", 
                                "Demo User", "demo@zatbiz.com", demoHashedPassword);
                            System.out.println("Demo user seeded successfully!");
                        } else {
                            System.out.println("Demo user already exists. Updating password to password123 to ensure fresh credentials...");
                            jdbcTemplate.update("UPDATE core_user SET password = ? WHERE email = 'demo@zatbiz.com'", demoHashedPassword);
                        }
                    } catch (Exception e) {
                        System.err.println("Note: Seeding demo user skipped: " + e.getMessage());
                    }
                }

                // 9. Seed default restaurant data
                if (tableExists(jdbcTemplate, "restaurant_data")) {
                    try {
                        Integer dataCount = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM restaurant_data", Integer.class);
                        if (dataCount == null || dataCount == 0) {
                            System.out.println("Seeding initial restaurant administration data...");
                            
                            // Seed Event
                            jdbcTemplate.update("INSERT INTO restaurant_data (project_id, data_type, data_json) VALUES (?, ?, ?)", 
                                1L, "event", "{\"name\":\"Royal Wine Pairing Gala\",\"date\":\"2026-07-15\",\"time\":\"19:00\",\"capacity\":50,\"price\":2500,\"status\":\"Published\",\"artist\":\"Sommelier Elena & Quartet Jazz Band\",\"description\":\"An exclusive culinary evening featuring a curated 5-course tasting menu paired with exceptional reserves.\",\"banner\":\"https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&auto=format&fit=crop&q=80\"}");

                            // Seed Staff
                            jdbcTemplate.update("INSERT INTO restaurant_data (project_id, data_type, data_json) VALUES (?, ?, ?)", 
                                1L, "staff", "{\"name\":\"Chef Marcus Pierre\",\"role\":\"Head Chef\",\"email\":\"marcus@restaurant.com\",\"phone\":\"+91 98888 77777\",\"attendance\":\"Present\",\"salary\":120000}");
                            jdbcTemplate.update("INSERT INTO restaurant_data (project_id, data_type, data_json) VALUES (?, ?, ?)", 
                                1L, "staff", "{\"name\":\"Clara Dupont\",\"role\":\"Sommelier\",\"email\":\"clara@restaurant.com\",\"phone\":\"+91 98888 66666\",\"attendance\":\"Present\",\"salary\":85000}");

                            // Seed Delivery Partner
                            jdbcTemplate.update("INSERT INTO restaurant_data (project_id, data_type, data_json) VALUES (?, ?, ?)", 
                                1L, "delivery_partner", "{\"name\":\"Rohan Sharma\",\"phone\":\"+91 97777 55555\",\"vehicle\":\"Scooter\",\"status\":\"Available\",\"earnings\":1250,\"performance\":\"Outstanding\"}");

                            // Seed Review
                            jdbcTemplate.update("INSERT INTO restaurant_data (project_id, data_type, data_json) VALUES (?, ?, ?)", 
                                1L, "review", "{\"author\":\"Lady Penelope\",\"rating\":5,\"comment\":\"The truffle pasta was absolutely divine! Superb service and exceptional wine recommendations by Clara.\",\"reply\":\"Thank you, Lady Penelope! It was an absolute pleasure hosting you.\",\"status\":\"Visible\"}");

                            // Seed Inventory
                            jdbcTemplate.update("INSERT INTO restaurant_data (project_id, data_type, data_json) VALUES (?, ?, ?)", 
                                1L, "inventory_item", "{\"ingredientName\":\"Truffle Oil\",\"stockLevel\":15,\"unit\":\"Bottles\",\"lowStockAlert\":5,\"vendor\":\"Premium Truffles Ltd\"}");
                            jdbcTemplate.update("INSERT INTO restaurant_data (project_id, data_type, data_json) VALUES (?, ?, ?)", 
                                1L, "inventory_item", "{\"ingredientName\":\"Aged Parmesan\",\"stockLevel\":4,\"unit\":\"Kg\",\"lowStockAlert\":5,\"vendor\":\"Milano Dairy Co\"}");

                            // Seed Vendor
                            jdbcTemplate.update("INSERT INTO restaurant_data (project_id, data_type, data_json) VALUES (?, ?, ?)", 
                                1L, "vendor", "{\"name\":\"Premium Truffles Ltd\",\"contact\":\"Giovanni R.\",\"phone\":\"+39 02 123456\",\"email\":\"orders@premiumtruffles.it\"}");
                            jdbcTemplate.update("INSERT INTO restaurant_data (project_id, data_type, data_json) VALUES (?, ?, ?)", 
                                1L, "vendor", "{\"name\":\"Milano Dairy Co\",\"contact\":\"Lucia M.\",\"phone\":\"+91 96666 44444\",\"email\":\"sales@milanodairy.com\"}");

                            // Seed Offer
                            jdbcTemplate.update("INSERT INTO restaurant_data (project_id, data_type, data_json) VALUES (?, ?, ?)", 
                                1L, "offer", "{\"title\":\"Haute Happy Hour\",\"type\":\"Happy Hour Offers\",\"details\":\"25% discount on all premium vintage wines by the glass.\",\"schedule\":\"Mon-Thu, 4 PM - 7 PM\",\"active\":true}");
                                
                            // Seed Event Booking (Registration)
                            jdbcTemplate.update("INSERT INTO restaurant_data (project_id, data_type, data_json) VALUES (?, ?, ?)", 
                                1L, "event_booking", "{\"eventName\":\"Royal Wine Pairing Gala\",\"customerName\":\"Lord Grantham\",\"customerEmail\":\"grantham@downton.com\",\"tickets\":2,\"totalPaid\":5000,\"status\":\"Approved\"}");

                            // Seed Wallet Transaction
                            jdbcTemplate.update("INSERT INTO restaurant_data (project_id, data_type, data_json) VALUES (?, ?, ?)", 
                                1L, "wallet_transaction", "{\"customerEmail\":\"demo@zatbiz.com\",\"amount\":500,\"type\":\"Credit\",\"description\":\"Loyalty reward refund\",\"date\":\"2026-06-23\"}");

                            System.out.println("Seeded restaurant administration data successfully!");
                        }
                    } catch (Exception e) {
                        System.err.println("Note: Seeding restaurant data skipped: " + e.getMessage());
                    }
                }

                System.out.println("Database migrations and data shifting completed successfully!");
            } catch (Exception e) {
                System.err.println("Database migration failed: " + e.getMessage());
            }
        };
    }

    private boolean tableExists(JdbcTemplate jdbcTemplate, String tableName) {
        try {
            Integer count = jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM information_schema.tables WHERE UPPER(table_name) = UPPER(?)",
                Integer.class,
                tableName
            );
            return count != null && count > 0;
        } catch (Exception e) {
            return false;
        }
    }

    private boolean columnExists(JdbcTemplate jdbcTemplate, String tableName, String columnName) {
        try {
            Integer count = jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM information_schema.columns WHERE UPPER(table_name) = UPPER(?) AND UPPER(column_name) = UPPER(?)",
                Integer.class,
                tableName,
                columnName
            );
            return count != null && count > 0;
        } catch (Exception e) {
            return false;
        }
    }

    private void migrateTable(JdbcTemplate jdbcTemplate, String oldTable, String newTable, String insertSql, String seqTable) {
        try {
            Boolean oldExists = tableExists(jdbcTemplate, oldTable);

            if (oldExists && tableExists(jdbcTemplate, newTable)) {
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
                System.out.println("Source table " + oldTable + " or destination table " + newTable + " does not exist, skipping migration.");
            }
        } catch (Exception e) {
            System.err.println("Migration error for " + oldTable + " -> " + newTable + ": " + e.getMessage());
        }
    }

}