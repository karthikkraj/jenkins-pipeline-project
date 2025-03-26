/*
  # Product Schema Setup

  1. New Tables
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `slug` (text, unique)
      - `created_at` (timestamp)
    
    - `products`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `price` (decimal)
      - `image_url` (text)
      - `category_id` (uuid, foreign key)
      - `created_at` (timestamp)
      - `stock` (integer)
      - `rating` (decimal)
      - `reviews_count` (integer)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access
*/

-- Create categories table
CREATE TABLE categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  slug text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price decimal(10,2) NOT NULL,
  image_url text NOT NULL,
  category_id uuid REFERENCES categories(id),
  created_at timestamptz DEFAULT now(),
  stock integer NOT NULL DEFAULT 0,
  rating decimal(3,2) DEFAULT 0,
  reviews_count integer DEFAULT 0,
  CHECK (price >= 0),
  CHECK (stock >= 0),
  CHECK (rating >= 0 AND rating <= 5)
);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access for categories"
  ON categories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access for products"
  ON products
  FOR SELECT
  TO public
  USING (true);

-- Insert sample categories
INSERT INTO categories (name, slug) VALUES
  ('Phones', 'phones'),
  ('Laptops', 'laptops'),
  ('Accessories', 'accessories'),
  ('Men', 'men'),
  ('Women', 'women'),
  ('Kids', 'kids'),
  ('Furniture', 'furniture'),
  ('Decor', 'decor'),
  ('Kitchen', 'kitchen');

-- Insert sample products for each category
DO $$
DECLARE
  phones_id uuid;
  laptops_id uuid;
  accessories_id uuid;
  men_id uuid;
  women_id uuid;
  kids_id uuid;
  furniture_id uuid;
  decor_id uuid;
  kitchen_id uuid;
BEGIN
  -- Get category IDs
  SELECT id INTO phones_id FROM categories WHERE slug = 'phones';
  SELECT id INTO laptops_id FROM categories WHERE slug = 'laptops';
  SELECT id INTO accessories_id FROM categories WHERE slug = 'accessories';
  SELECT id INTO men_id FROM categories WHERE slug = 'men';
  SELECT id INTO women_id FROM categories WHERE slug = 'women';
  SELECT id INTO kids_id FROM categories WHERE slug = 'kids';
  SELECT id INTO furniture_id FROM categories WHERE slug = 'furniture';
  SELECT id INTO decor_id FROM categories WHERE slug = 'decor';
  SELECT id INTO kitchen_id FROM categories WHERE slug = 'kitchen';

  -- Phones
  INSERT INTO products (name, description, price, image_url, category_id, stock, rating, reviews_count) VALUES
    ('iPhone 15 Pro', 'Latest iPhone with advanced camera system and A17 Pro chip', 999.99, 'https://images.unsplash.com/photo-1696426051769-867393f1acd6', phones_id, 50, 4.8, 245),
    ('Samsung Galaxy S24', 'Flagship Android phone with AI capabilities', 899.99, 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf', phones_id, 45, 4.7, 189),
    ('Google Pixel 8', 'Pure Android experience with exceptional camera', 799.99, 'https://images.unsplash.com/photo-1598327105666-5b89351aff97', phones_id, 30, 4.6, 156);

  -- Laptops
  INSERT INTO products (name, description, price, image_url, category_id, stock, rating, reviews_count) VALUES
    ('MacBook Pro 16"', 'Powerful laptop for professionals with M2 chip', 2499.99, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8', laptops_id, 25, 4.9, 178),
    ('Dell XPS 15', 'Premium Windows laptop with OLED display', 1999.99, 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45', laptops_id, 20, 4.7, 145),
    ('Lenovo ThinkPad X1', 'Business laptop with excellent keyboard', 1799.99, 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed', laptops_id, 15, 4.5, 98);

  -- Accessories
  INSERT INTO products (name, description, price, image_url, category_id, stock, rating, reviews_count) VALUES
    ('AirPods Pro', 'Wireless earbuds with noise cancellation', 249.99, 'https://images.unsplash.com/photo-1588156979435-379b927bcff5', accessories_id, 100, 4.7, 567),
    ('Samsung Galaxy Watch 6', 'Advanced smartwatch with health tracking', 349.99, 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a', accessories_id, 75, 4.6, 234),
    ('Apple Watch Ultra', 'Premium smartwatch for adventurers', 799.99, 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9', accessories_id, 40, 4.8, 189);

  -- Continue with more product insertions for each category...
END $$;