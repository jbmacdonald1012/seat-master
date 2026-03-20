-- Seat Master Seed Data
-- Run this in WebStorm DB console after schema.sql

-- 1. Users (password: P@$$w0rd! for all accounts)
INSERT INTO users (username, email, password_hash, full_name, role) VALUES
('admin',      'admin@seatmaster.com',    '$2b$10$YSrWd4EzuoOOMZoSPC/iY.AEdMHkIQmEOABoMG31ZCQNT8jhpQEZi', 'Admin User',          'admin'),
('employee1',  'employee@seatmaster.com', '$2b$10$YSrWd4EzuoOOMZoSPC/iY.AEdMHkIQmEOABoMG31ZCQNT8jhpQEZi', 'Event Manager',       'employee'),
('moderator',  'moderator@seatmaster.com','$2b$10$YSrWd4EzuoOOMZoSPC/iY.AEdMHkIQmEOABoMG31ZCQNT8jhpQEZi', 'Content Moderator',   'employee'),
('johndoe',    'john@example.com',        '$2b$10$YSrWd4EzuoOOMZoSPC/iY.AEdMHkIQmEOABoMG31ZCQNT8jhpQEZi', 'John Doe',            'customer'),
('janedoe',    'jane@example.com',        '$2b$10$YSrWd4EzuoOOMZoSPC/iY.AEdMHkIQmEOABoMG31ZCQNT8jhpQEZi', 'Jane Smith',          'customer'),
('musicfan',   'music@example.com',       '$2b$10$YSrWd4EzuoOOMZoSPC/iY.AEdMHkIQmEOABoMG31ZCQNT8jhpQEZi', 'Music Lover',         'customer'),
('sportsfan',  'sports@example.com',      '$2b$10$YSrWd4EzuoOOMZoSPC/iY.AEdMHkIQmEOABoMG31ZCQNT8jhpQEZi', 'Sports Enthusiast',   'customer');

-- 2. Categories
INSERT INTO categories (name, slug, description) VALUES
('Concerts',  'concerts',  'Live music performances from all genres'),
('Sports',    'sports',    'Professional and college sporting events'),
('Comedy',    'comedy',    'Stand-up comedy shows and performances'),
('Theater',   'theater',   'Broadway shows, plays, and musicals'),
('Festivals', 'festivals', 'Music festivals and multi-day events');

-- 3. Events
INSERT INTO events (title, description, category_id, venue_name, venue_address, city, state, event_date, image_url, total_tickets, available_tickets, base_price, cost_per_ticket, is_featured) VALUES
('Taylor Swift - The Eras Tour',
  'Experience the musical journey through Taylor Swift''s iconic eras with stunning visuals and unforgettable performances.',
  1, 'Madison Square Garden', '4 Pennsylvania Plaza', 'New York', 'NY',
  '2026-06-15 19:30:00', 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800',
  300, 250, 299.99, 194.99, true),

('Metallica Live',
  'The legendary metal band brings their electrifying performance to your city. Prepare for an epic night of thrash metal.',
  1, 'Staples Center', '1111 S Figueroa St', 'Los Angeles', 'CA',
  '2026-07-20 20:00:00', 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800',
  500, 450, 175.00, 113.75, true),

('Ed Sheeran Acoustic Tour',
  'An intimate acoustic performance featuring Ed Sheeran''s greatest hits and new material.',
  1, 'Red Rocks Amphitheatre', '18300 W Alameda Pkwy', 'Morrison', 'CO',
  '2026-08-10 19:00:00', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800',
  200, 180, 225.00, 146.25, false),

('Lakers vs Warriors',
  'NBA Western Conference showdown between two powerhouse teams. Don''t miss this thriller!',
  2, 'Crypto.com Arena', '1111 S Figueroa St', 'Los Angeles', 'CA',
  '2026-05-25 19:30:00', 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800',
  800, 650, 150.00, 97.50, true),

('Yankees vs Red Sox',
  'Classic baseball rivalry at its finest. One of the most anticipated matchups of the season.',
  2, 'Yankee Stadium', '1 E 161st St', 'Bronx', 'NY',
  '2026-06-05 19:05:00', 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=800',
  1000, 850, 85.00, 55.25, false),

('NFL: Cowboys vs Eagles',
  'NFC East division rivalry game. Experience the intensity of professional football.',
  2, 'AT&T Stadium', '1 AT&T Way', 'Arlington', 'TX',
  '2026-09-20 20:15:00', 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800',
  1200, 1000, 125.00, 81.25, true),

('Kevin Hart - Reality Check',
  'Kevin Hart returns with his hilarious observations on everyday life in this must-see comedy special.',
  3, 'Comedy Store', '8433 Sunset Blvd', 'Los Angeles', 'CA',
  '2026-07-15 21:00:00', 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800',
  300, 275, 89.99, 58.49, false),

('Dave Chappelle Live',
  'An unforgettable evening with one of comedy''s greatest minds. Expect the unexpected.',
  3, 'Radio City Music Hall', '1260 6th Ave', 'New York', 'NY',
  '2026-08-22 20:00:00', 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=800',
  600, 500, 125.00, 81.25, true),

('Hamilton',
  'The revolutionary musical phenomenon that blends hip-hop with American history.',
  4, 'Richard Rodgers Theatre', '226 W 46th St', 'New York', 'NY',
  '2026-06-30 20:00:00', 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800',
  400, 320, 199.00, 129.35, true),

('The Lion King',
  'Disney''s award-winning musical brings the African savanna to life with stunning costumes and puppetry.',
  4, 'Minskoff Theatre', '200 W 45th St', 'New York', 'NY',
  '2026-07-25 19:30:00', 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=800',
  450, 400, 175.00, 113.75, false),

('Coachella Valley Music Festival',
  'Three days of music, art, and culture in the California desert featuring top artists from around the world.',
  5, 'Empire Polo Club', '81-800 Avenue 51', 'Indio', 'CA',
  '2026-04-10 12:00:00', 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800',
  5000, 3500, 449.00, 291.85, true),

('Lollapalooza',
  'Chicago''s premier music festival featuring rock, pop, hip-hop, and electronic music across multiple stages.',
  5, 'Grant Park', '337 E Randolph St', 'Chicago', 'IL',
  '2026-08-01 11:00:00', 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800',
  4000, 3000, 375.00, 243.75, true);

-- 4. Tickets
INSERT INTO tickets (event_id, section, row_number, seat_number, price, is_sold)
SELECT 1, 'Floor', 'A', generate_series(1, 20)::text, 349.99, false;

INSERT INTO tickets (event_id, section, row_number, seat_number, price, is_sold)
SELECT 1, 'Lower Bowl', 'B', generate_series(1, 30)::text, 299.99, false;

INSERT INTO tickets (event_id, section, row_number, seat_number, price, is_sold)
SELECT 4, 'Courtside', 'A', generate_series(1, 20)::text, 500.00, false;

INSERT INTO tickets (event_id, section, row_number, seat_number, price, is_sold)
SELECT 4, 'Lower Level', 'C', generate_series(1, 50)::text, 150.00, false;

INSERT INTO tickets (event_id, section, row_number, seat_number, price, is_sold)
SELECT 7, 'General Admission', 'GA', generate_series(1, 100)::text, 89.99, false;

-- 5. Purchases
INSERT INTO purchases (user_id, event_id, ticket_ids, quantity, total_price, status, payment_method, notes) VALUES
(4, 1, ARRAY[1, 2],           2, 699.98,  'completed',  'Credit Card', 'Purchase completed successfully'),
(5, 4, ARRAY[51],             1, 500.00,  'completed',  'PayPal',      'Purchase completed successfully'),
(6, 7, ARRAY[101, 102, 103],  3, 269.97,  'completed',  'Credit Card', 'Purchase completed successfully'),
(7, 1, ARRAY[3],              1, 349.99,  'completed',  'Credit Card', 'Purchase completed successfully'),
(5, 8, ARRAY[]::integer[],     2, 250.00,  'completed',  'Credit Card', 'Purchase completed successfully'),
(6, 9, ARRAY[]::integer[],     1, 199.00,  'completed',  'PayPal',      'Purchase completed successfully'),
(4, 4, ARRAY[]::integer[],     2, 300.00,  'confirmed',  'Credit Card', 'Awaiting event date'),
(7, 11, ARRAY[]::integer[],    1, 449.00,  'pending',    'Credit Card', 'Payment pending confirmation');

-- Mark sold tickets and update available counts
UPDATE tickets SET is_sold = true WHERE id IN (1, 2, 51, 101, 102, 103, 3);
UPDATE events SET available_tickets = available_tickets - 3 WHERE id = 1;
UPDATE events SET available_tickets = available_tickets - 3 WHERE id = 4;
UPDATE events SET available_tickets = available_tickets - 3 WHERE id = 7;
UPDATE events SET available_tickets = available_tickets - 2 WHERE id = 8;
UPDATE events SET available_tickets = available_tickets - 1 WHERE id = 9;

-- 6. Comments
INSERT INTO comments (event_id, user_id, comment_text) VALUES
(1, 4, 'So excited for this! Taylor is the best performer ever. Can''t wait to sing along to all the eras!'),
(1, 5, 'Got my tickets! This is going to be the concert of the year. Already planning my outfit!'),
(4, 6, 'This Lakers-Warriors matchup is going to be incredible. LeBron vs Steph, what more could you want?'),
(7, 7, 'Kevin Hart is hilarious! Saw him before and laughed the entire time. Highly recommend!'),
(4, 4, 'Court side seats secured! This is going to be an amazing experience.');

-- 7. Ratings
INSERT INTO ratings (event_id, user_id, rating) VALUES
(1, 4, 5),
(1, 5, 5),
(4, 6, 5),
(7, 7, 4),
(4, 4, 5);

-- 8. Contact Messages
INSERT INTO contact_messages (name, email, user_id, subject, message, status) VALUES
('Sarah Johnson',   'sarah.j@email.com',  NULL, 'Question about ticket refunds',  'Hi, I purchased tickets to an event that was postponed. What is the refund policy?',               'unread'),
('John Doe',        'john@example.com',   4,    'Group booking inquiry',          'I would like to purchase 20 tickets for a corporate event. Do you offer group discounts?',           'read'),
('Emily Rodriguez', 'emily.r@email.com',  NULL, 'Accessibility assistance',       'I need wheelchair accessible seating for the Hamilton show. Can you help me with this?',              'responded'),
('Jane Smith',      'jane@example.com',   5,    'Payment issue',                  'My payment failed but I was charged. Please help!',                                                    'unread');
