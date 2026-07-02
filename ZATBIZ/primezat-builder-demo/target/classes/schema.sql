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
    pre_order_items VARCHAR(2000),
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

-- 21. Restaurant Custom Information Table
CREATE TABLE IF NOT EXISTS restaurant_info (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT,
    subcategory VARCHAR(255),
    restaurant_name VARCHAR(255),
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
    theme_color VARCHAR(255),
    selected_theme VARCHAR(255),
    selected_homepage_layout VARCHAR(255),
    selected_login_layout VARCHAR(255),
    selected_dashboard_layout VARCHAR(255)
);

-- 22. Medical Shop Custom Information Table
CREATE TABLE IF NOT EXISTS medical_shop_info (
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
    theme_color VARCHAR(255),
    selected_theme VARCHAR(255),
    selected_homepage_layout VARCHAR(255),
    selected_login_layout VARCHAR(255),
    selected_dashboard_layout VARCHAR(255)
);

-- 23. Medical Shop Products Table
CREATE TABLE IF NOT EXISTS medical_shop_product (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT,
    name VARCHAR(255),
    brand VARCHAR(255),
    generic_name VARCHAR(255),
    category VARCHAR(255),
    description VARCHAR(2000),
    uses VARCHAR(1000),
    dosage VARCHAR(1000),
    ingredients VARCHAR(1000),
    side_effects VARCHAR(1000),
    warnings VARCHAR(1000),
    storage_instructions VARCHAR(1000),
    expiry_information VARCHAR(255),
    price DOUBLE PRECISION,
    discount INTEGER,
    stock_status VARCHAR(255),
    stock_count INTEGER,
    rating DOUBLE PRECISION,
    image_url TEXT,
    prescription_required BOOLEAN DEFAULT FALSE
);

-- 24. Medical Shop Orders Table
CREATE TABLE IF NOT EXISTS medical_shop_order (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT,
    customer_name VARCHAR(255),
    customer_email VARCHAR(255),
    customer_phone VARCHAR(255),
    shipping_address VARCHAR(1000),
    delivery_slot VARCHAR(255),
    payment_method VARCHAR(255),
    prescription_url TEXT,
    doctor_notes VARCHAR(1000),
    pharmacist_verified BOOLEAN DEFAULT FALSE,
    status VARCHAR(255) DEFAULT 'Order Placed',
    items_json TEXT,
    subtotal DOUBLE PRECISION,
    delivery_charges DOUBLE PRECISION,
    total DOUBLE PRECISION,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 25. Event Planner Agency Information Table (Consolidated)
CREATE TABLE IF NOT EXISTS event_agency_info (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT,
    company_name VARCHAR(255),
    owner_name VARCHAR(255),
    business_email VARCHAR(255),
    phone VARCHAR(255),
    whats_app VARCHAR(255),
    business_address VARCHAR(1000),
    city VARCHAR(255),
    state VARCHAR(255),
    country VARCHAR(255),
    logo_url TEXT,
    cover_image_url TEXT,
    working_hours VARCHAR(255),
    gst_number VARCHAR(255),
    social_media_links TEXT,
    tagline VARCHAR(255),
    about_text TEXT,
    primary_color VARCHAR(255),
    secondary_color VARCHAR(255),
    seo_title VARCHAR(255),
    seo_keywords TEXT,
    seo_description TEXT
);

-- 26. Event Planner Catalog Items Table (Consolidated Services/Packages/Portfolio/etc.)
CREATE TABLE IF NOT EXISTS event_catalog (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT,
    type VARCHAR(255),
    title VARCHAR(255),
    subtitle VARCHAR(255),
    description VARCHAR(2000),
    price DOUBLE PRECISION,
    image_url TEXT,
    data_json TEXT
);

-- 27. Event Planner Bookings Table (Consolidated Bookings/Checklists/Calendar)
CREATE TABLE IF NOT EXISTS event_booking (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT,
    customer_name VARCHAR(255),
    customer_email VARCHAR(255),
    customer_phone VARCHAR(255),
    event_type VARCHAR(255),
    event_date VARCHAR(255),
    budget DOUBLE PRECISION,
    location VARCHAR(255),
    guests_count INTEGER,
    message VARCHAR(2000),
    status VARCHAR(255),
    checklist_json TEXT,
    calendar_json TEXT
);

-- 28. Event Planner Customer Relations Table (Consolidated Customers/Leads/Contacts/Support)
CREATE TABLE IF NOT EXISTS event_customer (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT,
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(255),
    address VARCHAR(255),
    notes VARCHAR(2000),
    type VARCHAR(255),
    status VARCHAR(255),
    message_json TEXT
);

-- 29. Event Planner Billing & Finance Table (Consolidated Payments/Invoices/Expenses/Coupons)
CREATE TABLE IF NOT EXISTS event_billing (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT,
    type VARCHAR(255),
    amount DOUBLE PRECISION,
    date VARCHAR(255),
    status VARCHAR(255),
    details_json TEXT
);

-- 30. Restaurant Registered Users Table
CREATE TABLE IF NOT EXISTS restaurant_users (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(255),
    address VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE gym_info ADD COLUMN IF NOT EXISTS header_bg_image TEXT;
ALTER TABLE gym_info ADD COLUMN IF NOT EXISTS selected_login_layout VARCHAR(255);


