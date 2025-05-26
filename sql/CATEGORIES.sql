INSERT INTO categories (name) VALUES
('Daily Offers'),
('Prime'),
('Electronics'),
('Books'),
('Fashion'),
('Home & Furniture'),
('Toys & Games'),
('Health & Beauty'),
('Sports & Outdoors'),
('Arts & Crafts'),
('Jewelry & Watches'),
('Tech & Innovations');


-- Sottocategorie per Daily Offers (ID presunto: 1)
INSERT INTO subcategories (name, category_id) VALUES
('Flash Deals', (SELECT id FROM categories WHERE name = 'Daily Offers')),
('Limited Time Offers', (SELECT id FROM categories WHERE name = 'Daily Offers')),
('Best Sellers Deals', (SELECT id FROM categories WHERE name = 'Daily Offers')),
('Clearance Sales', (SELECT id FROM categories WHERE name = 'Daily Offers')),
('Exclusive Online Deals', (SELECT id FROM categories WHERE name = 'Daily Offers')),
('Seasonal Discounts', (SELECT id FROM categories WHERE name = 'Daily Offers'));

-- Sottocategorie per Prime (ID presunto: 2)
INSERT INTO subcategories (name, category_id) VALUES
('Prime Video', (SELECT id FROM categories WHERE name = 'Prime')),
('Prime Music', (SELECT id FROM categories WHERE name = 'Prime')),
('Prime Delivery', (SELECT id FROM categories WHERE name = 'Prime')),
('Prime Reading', (SELECT id FROM categories WHERE name = 'Prime')),
('Prime Gaming', (SELECT id FROM categories WHERE name = 'Prime')),
('Prime Pantry', (SELECT id FROM categories WHERE name = 'Prime'));

-- Sottocategorie per Electronics (ID presunto: 3)
INSERT INTO subcategories (name, category_id) VALUES
('Smartphones', (SELECT id FROM categories WHERE name = 'Electronics')),
('Laptops', (SELECT id FROM categories WHERE name = 'Electronics')),
('TVs & Home Cinema', (SELECT id FROM categories WHERE name = 'Electronics')),
('Cameras', (SELECT id FROM categories WHERE name = 'Electronics')),
('Headphones', (SELECT id FROM categories WHERE name = 'Electronics')),
('Wearable Tech', (SELECT id FROM categories WHERE name = 'Electronics')),
('Computer Accessories', (SELECT id FROM categories WHERE name = 'Electronics')),
('Gaming Consoles', (SELECT id FROM categories WHERE name = 'Electronics')),
('Smart Home Devices', (SELECT id FROM categories WHERE name = 'Electronics'));

-- Sottocategorie per Books (ID presunto: 4)
INSERT INTO subcategories (name, category_id) VALUES
('Fiction', (SELECT id FROM categories WHERE name = 'Books')),
('Non-Fiction', (SELECT id FROM categories WHERE name = 'Books')),
('Children''s Books', (SELECT id FROM categories WHERE name = 'Books')),
('Cookbooks', (SELECT id FROM categories WHERE name = 'Books')),
('Comics & Graphic Novels', (SELECT id FROM categories WHERE name = 'Books')),
('Educational Books', (SELECT id FROM categories WHERE name = 'Books')),
('Biographies & Memoirs', (SELECT id FROM categories WHERE name = 'Books')),
('Science & Technology', (SELECT id FROM categories WHERE name = 'Books'));

-- Sottocategorie per Fashion (ID presunto: 5)
INSERT INTO subcategories (name, category_id) VALUES
('Men''s Clothing', (SELECT id FROM categories WHERE name = 'Fashion')),
('Women''s Clothing', (SELECT id FROM categories WHERE name = 'Fashion')),
('Kids'' Fashion', (SELECT id FROM categories WHERE name = 'Fashion')),
('Footwear', (SELECT id FROM categories WHERE name = 'Fashion')),
('Accessories', (SELECT id FROM categories WHERE name = 'Fashion')),
('Jewelry', (SELECT id FROM categories WHERE name = 'Fashion')),
('Handbags & Wallets', (SELECT id FROM categories WHERE name = 'Fashion')),
('Watches', (SELECT id FROM categories WHERE name = 'Fashion')),
('Sportswear', (SELECT id FROM categories WHERE name = 'Fashion')),
('Outerwear', (SELECT id FROM categories WHERE name = 'Fashion'));

-- Sottocategorie per Home & Furniture (ID presunto: 6)
INSERT INTO subcategories (name, category_id) VALUES
('Living Room Furniture', (SELECT id FROM categories WHERE name = 'Home & Furniture')),
('Bedroom Furniture', (SELECT id FROM categories WHERE name = 'Home & Furniture')),
('Kitchen & Dining', (SELECT id FROM categories WHERE name = 'Home & Furniture')),
('Home Decor', (SELECT id FROM categories WHERE name = 'Home & Furniture')),
('Lighting', (SELECT id FROM categories WHERE name = 'Home & Furniture')),
('Bedding & Bath', (SELECT id FROM categories WHERE name = 'Home & Furniture')),
('Storage & Organization', (SELECT id FROM categories WHERE name = 'Home & Furniture')),
('Outdoor Furniture', (SELECT id FROM categories WHERE name = 'Home & Furniture')),
('Office Furniture', (SELECT id FROM categories WHERE name = 'Home & Furniture'));

-- Sottocategorie per Toys & Games (ID presunto: 7)
INSERT INTO subcategories (name, category_id) VALUES
('Board Games', (SELECT id FROM categories WHERE name = 'Toys & Games')),
('Action Figures', (SELECT id FROM categories WHERE name = 'Toys & Games')),
('Educational Toys', (SELECT id FROM categories WHERE name = 'Toys & Games')),
('Dolls & Accessories', (SELECT id FROM categories WHERE name = 'Toys & Games')),
('Puzzles', (SELECT id FROM categories WHERE name = 'Toys & Games')),
('Outdoor Play', (SELECT id FROM categories WHERE name = 'Toys & Games')),
('Building Sets & Blocks', (SELECT id FROM categories WHERE name = 'Toys & Games')),
('Electronic Toys', (SELECT id FROM categories WHERE name = 'Toys & Games'));

-- Sottocategorie per Health & Beauty (ID presunto: 8)
INSERT INTO subcategories (name, category_id) VALUES
('Skincare', (SELECT id FROM categories WHERE name = 'Health & Beauty')),
('Haircare', (SELECT id FROM categories WHERE name = 'Health & Beauty')),
('Makeup', (SELECT id FROM categories WHERE name = 'Health & Beauty')),
('Fragrances', (SELECT id FROM categories WHERE name = 'Health & Beauty')),
('Vitamins & Supplements', (SELECT id FROM categories WHERE name = 'Health & Beauty')),
('Personal Care', (SELECT id FROM categories WHERE name = 'Health & Beauty')),
('Oral Care', (SELECT id FROM categories WHERE name = 'Health & Beauty')),
('Men''s Grooming', (SELECT id FROM categories WHERE name = 'Health & Beauty'));

-- Sottocategorie per Sports & Outdoors (ID presunto: 9)
INSERT INTO subcategories (name, category_id) VALUES
('Camping & Hiking', (SELECT id FROM categories WHERE name = 'Sports & Outdoors')),
('Fitness Equipment', (SELECT id FROM categories WHERE name = 'Sports & Outdoors')),
('Cycling', (SELECT id FROM categories WHERE name = 'Sports & Outdoors')),
('Team Sports', (SELECT id FROM categories WHERE name = 'Sports & Outdoors')),
('Outdoor Recreation', (SELECT id FROM categories WHERE name = 'Sports & Outdoors')),
('Running', (SELECT id FROM categories WHERE name = 'Sports & Outdoors')),
('Water Sports', (SELECT id FROM categories WHERE name = 'Sports & Outdoors')),
('Winter Sports', (SELECT id FROM categories WHERE name = 'Sports & Outdoors'));

-- Sottocategorie per Arts & Crafts (ID presunto: 10)
INSERT INTO subcategories (name, category_id) VALUES
('Drawing & Painting', (SELECT id FROM categories WHERE name = 'Arts & Crafts')),
('Sewing & Fabric', (SELECT id FROM categories WHERE name = 'Arts & Crafts')),
('Craft Supplies', (SELECT id FROM categories WHERE name = 'Arts & Crafts')),
('Scrapbooking', (SELECT id FROM categories WHERE name = 'Arts & Crafts')),
('Knitting & Crochet', (SELECT id FROM categories WHERE name = 'Arts & Crafts')),
('Pottery & Ceramics', (SELECT id FROM categories WHERE name = 'Arts & Crafts')),
('Woodworking', (SELECT id FROM categories WHERE name = 'Arts & Crafts'));

-- Sottocategorie per Jewelry & Watches (ID presunto: 11)
INSERT INTO subcategories (name, category_id) VALUES
('Necklaces', (SELECT id FROM categories WHERE name = 'Jewelry & Watches')),
('Bracelets', (SELECT id FROM categories WHERE name = 'Jewelry & Watches')),
('Earrings', (SELECT id FROM categories WHERE name = 'Jewelry & Watches')),
('Rings', (SELECT id FROM categories WHERE name = 'Jewelry & Watches')),
('Men''s Watches', (SELECT id FROM categories WHERE name = 'Jewelry & Watches')),
('Women''s Watches', (SELECT id FROM categories WHERE name = 'Jewelry & Watches')),
('Luxury Watches', (SELECT id FROM categories WHERE name = 'Jewelry & Watches')),
('Watch Accessories', (SELECT id FROM categories WHERE name = 'Jewelry & Watches'));

-- Sottocategorie per Tech & Innovations (ID presunto: 12)
INSERT INTO subcategories (name, category_id) VALUES
('Smart Home Devices', (SELECT id FROM categories WHERE name = 'Tech & Innovations')),
('Drones', (SELECT id FROM categories WHERE name = 'Tech & Innovations')),
('Virtual Reality', (SELECT id FROM categories WHERE name = 'Tech & Innovations')),
('Robotics', (SELECT id FROM categories WHERE name = 'Tech & Innovations')),
('3D Printing', (SELECT id FROM categories WHERE name = 'Tech & Innovations')),
('Artificial Intelligence', (SELECT id FROM categories WHERE name = 'Tech & Innovations')),
('Wearable Tech', (SELECT id FROM categories WHERE name = 'Tech & Innovations')),
('Electric Vehicles', (SELECT id FROM categories WHERE name = 'Tech & Innovations'));
