-- TechTweak Supabase PostgreSQL Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Brands Table
CREATE TABLE brands (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL UNIQUE,
    slug VARCHAR(255) NOT NULL UNIQUE,
    logo_url TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Phones Table
CREATE TABLE phones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    
    -- Status
    is_published BOOLEAN DEFAULT FALSE,
    release_date DATE,
    upcoming BOOLEAN DEFAULT FALSE,
    
    -- Images (Array of external URLs)
    images TEXT[] DEFAULT '{}',
    
    -- Core Specs
    processor VARCHAR(255),
    ram VARCHAR(255),
    storage VARCHAR(255),
    display VARCHAR(255),
    battery VARCHAR(255),
    charging VARCHAR(255),
    camera_main VARCHAR(255),
    camera_front VARCHAR(255),
    os VARCHAR(255),
    
    -- Detailed Specs (JSONB for flexibility)
    detailed_specs JSONB DEFAULT '{}',
    
    -- Pricing
    price_usd DECIMAL(10, 2),
    price_eur DECIMAL(10, 2),
    price_inr DECIMAL(10, 2),
    
    -- Analytics & Ratings
    antutu_score INTEGER,
    geekbench_single INTEGER,
    geekbench_multi INTEGER,
    user_rating DECIMAL(3, 2),
    
    -- Meta for SEO
    meta_title VARCHAR(255),
    meta_description TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog Categories Table
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL UNIQUE,
    slug VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog Posts Table
CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    content TEXT NOT NULL,
    excerpt TEXT,
    featured_image TEXT,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    
    is_published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP WITH TIME ZONE,
    
    -- Meta for SEO
    meta_title VARCHAR(255),
    meta_description TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Post Tags Table
CREATE TABLE tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL UNIQUE,
    slug VARCHAR(255) NOT NULL UNIQUE
);

-- Post Tags Junction Table
CREATE TABLE post_tags (
    post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, tag_id)
);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_brands_modtime BEFORE UPDATE ON brands FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_phones_modtime BEFORE UPDATE ON phones FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_posts_modtime BEFORE UPDATE ON posts FOR EACH ROW EXECUTE FUNCTION update_modified_column();

-- Indexes for performance
CREATE INDEX idx_phones_brand_id ON phones(brand_id);
CREATE INDEX idx_phones_slug ON phones(slug);
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_category_id ON posts(category_id);
