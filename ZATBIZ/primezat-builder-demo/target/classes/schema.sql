-- ZATBIZ FULL SQL DATABASE SCHEMA
-- Execute this script directly in the Supabase SQL Editor to create all ZATBIZ tables instantly.

-- 1. Core Users Table
CREATE TABLE IF NOT EXISTS core_user (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- 2. Core Projects Table (Website Builder Canvas Sites)
CREATE TABLE IF NOT EXISTS core_project (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES core_user(id),
    name VARCHAR(255),
    description VARCHAR(255),
    blocks_json TEXT,
    status VARCHAR(255) DEFAULT 'Draft',
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- 3. Store Products/Menu Items Table
CREATE TABLE IF NOT EXISTS store_product (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT,
    name VARCHAR(255),
    description VARCHAR(1000),
    price DOUBLE PRECISION,
    category VARCHAR(255),
    image_url TEXT,
    variants TEXT,
    stock INTEGER DEFAULT 0,
    available BOOLEAN DEFAULT TRUE,
    brand VARCHAR(255),
    color VARCHAR(255),
    rating DOUBLE PRECISION,
    discount INTEGER
);

-- 4. Store Customers Table
CREATE TABLE IF NOT EXISTS store_customer (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(255),
    address VARCHAR(255),
    status VARCHAR(255) DEFAULT 'Lead',
    total_spent DOUBLE PRECISION DEFAULT 0.0,
    total_orders INTEGER DEFAULT 0,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- 5. Store Orders Table
CREATE TABLE IF NOT EXISTS store_order (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT,
    customer_id BIGINT,
    customer_name VARCHAR(255),
    customer_email VARCHAR(255),
    customer_phone VARCHAR(255),
    customer_address VARCHAR(255),
    items_json TEXT,
    subtotal DOUBLE PRECISION,
    tax DOUBLE PRECISION,
    total DOUBLE PRECISION,
    status VARCHAR(255) DEFAULT 'Pending',
    payment_gateway VARCHAR(255) DEFAULT 'Stripe',
    payment_status VARCHAR(255) DEFAULT 'Paid',
    invoice_number VARCHAR(255),
    payment_method VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(255),
    pincode VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- 6. Store Reservations Table (for restaurants)
CREATE TABLE IF NOT EXISTS store_reservation (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT,
    customer_name VARCHAR(255),
    customer_email VARCHAR(255),
    customer_phone VARCHAR(255),
    booking_date VARCHAR(255),
    booking_time VARCHAR(255),
    number_of_guests INTEGER,
    table_number VARCHAR(255),
    status VARCHAR(255) DEFAULT 'Pending',
    notes VARCHAR(1000),
    created_at TIMESTAMP
);

-- 7. Store Brand Table (for E-commerce variants)
CREATE TABLE IF NOT EXISTS store_brand (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT,
    name VARCHAR(255)
);

-- 8. Store Category Table (for E-commerce product categories)
CREATE TABLE IF NOT EXISTS store_category (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT,
    name VARCHAR(255)
);

-- 9. Store Coupon Codes Table
CREATE TABLE IF NOT EXISTS store_coupon (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT,
    code VARCHAR(255),
    discount_type VARCHAR(255),
    discount_value DOUBLE PRECISION,
    min_order_amount DOUBLE PRECISION,
    active BOOLEAN DEFAULT TRUE
);

-- 10. Store Settings Table
CREATE TABLE IF NOT EXISTS store_settings (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT,
    store_name VARCHAR(255),
    logo_url VARCHAR(255),
    tax_rate DOUBLE PRECISION DEFAULT 18.0,
    shipping_fee DOUBLE PRECISION DEFAULT 0.0,
    enable_upi BOOLEAN DEFAULT TRUE,
    enable_card BOOLEAN DEFAULT TRUE,
    enable_cod BOOLEAN DEFAULT TRUE
);

-- 11. Real Estate Agency Information Table
CREATE TABLE IF NOT EXISTS real_estate_info (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT,
    niches VARCHAR(255),
    company_name VARCHAR(255),
    business_name VARCHAR(255),
    company_description VARCHAR(2000),
    owner_name VARCHAR(255),
    mobile_no VARCHAR(255),
    email VARCHAR(255),
    whatsapp_no VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(255),
    country VARCHAR(255),
    pincode VARCHAR(255),
    logo_type VARCHAR(255),
    logo_url TEXT,
    brand_image_url TEXT,
    theme_color VARCHAR(255)
);

-- 12. Real Estate Brokers/Agents Table
CREATE TABLE IF NOT EXISTS real_estate_broker (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT,
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(255),
    specialization VARCHAR(255),
    commission_rate DOUBLE PRECISION,
    status VARCHAR(255),
    notes VARCHAR(1000)
);

-- 13. Real Estate Leads/Inquiries Table
CREATE TABLE IF NOT EXISTS real_estate_lead (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT,
    name VARCHAR(255),
    mobile VARCHAR(255),
    email VARCHAR(255),
    budget DOUBLE PRECISION,
    message VARCHAR(2000),
    property_id BIGINT,
    property_name VARCHAR(255),
    assigned_broker_id BIGINT,
    status VARCHAR(255),
    notes VARCHAR(2000),
    created_date VARCHAR(255)
);

-- 14. Real Estate Sales Transactions Table
CREATE TABLE IF NOT EXISTS real_estate_sale (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT,
    property_id BIGINT,
    property_name VARCHAR(255),
    client_name VARCHAR(255),
    client_email VARCHAR(255),
    broker_id BIGINT,
    sale_price DOUBLE PRECISION,
    commission_amount DOUBLE PRECISION,
    sale_date VARCHAR(255),
    status VARCHAR(255)
);

-- 15. Real Estate Customer Payments Table
CREATE TABLE IF NOT EXISTS real_estate_payment (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT,
    sale_id BIGINT,
    property_name VARCHAR(255),
    client_name VARCHAR(255),
    amount DOUBLE PRECISION,
    payment_date VARCHAR(255),
    payment_method VARCHAR(255),
    transaction_id VARCHAR(255),
    status VARCHAR(255)
);

-- 16. Real Estate Customer Site Visits Table
CREATE TABLE IF NOT EXISTS real_estate_site_visit (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT,
    lead_id BIGINT,
    client_name VARCHAR(255),
    property_id BIGINT,
    property_name VARCHAR(255),
    broker_id BIGINT,
    broker_name VARCHAR(255),
    visit_date VARCHAR(255),
    visit_time VARCHAR(255),
    status VARCHAR(255),
    feedback VARCHAR(2000)
);

-- 17. Real Estate Invoices Table
CREATE TABLE IF NOT EXISTS real_estate_invoice (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT,
    sale_id BIGINT,
    invoice_number VARCHAR(255),
    client_name VARCHAR(255),
    client_email VARCHAR(255),
    property_name VARCHAR(255),
    amount DOUBLE PRECISION,
    tax DOUBLE PRECISION,
    total DOUBLE PRECISION,
    issue_date VARCHAR(255),
    status VARCHAR(255)
);

-- 18. Restaurant Custom Data Table
CREATE TABLE IF NOT EXISTS restaurant_data (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT,
    data_type VARCHAR(255),
    data_json TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 19. Hospital/Clinic Custom Information Table
CREATE TABLE IF NOT EXISTS hospital_info (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT,
    subcategory VARCHAR(255),
    company_name VARCHAR(255),
    business_name VARCHAR(255),
    company_description VARCHAR(2000),
    owner_name VARCHAR(255),
    mobile_no VARCHAR(255),
    email VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(255),
    country VARCHAR(255),
    pincode VARCHAR(255),
    logo_url TEXT,
    theme_color VARCHAR(255)
);

-- 20. Gym/Fitness Center Custom Information Table
CREATE TABLE IF NOT EXISTS gym_info (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT,
    subcategory VARCHAR(255),
    club_name VARCHAR(255),
    business_name VARCHAR(255),
    description VARCHAR(2000),
    owner_name VARCHAR(255),
    mobile_no VARCHAR(255),
    email VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(255),
    country VARCHAR(255),
    pincode VARCHAR(255),
    logo_url TEXT,
    theme_color VARCHAR(255)
);
