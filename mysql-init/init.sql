-- Create the database
CREATE DATABASE IF NOT EXISTS wwe_db;
USE wwe_db;

-- Create the wrestlers table
CREATE TABLE IF NOT EXISTS wrestlers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(100),
  description TEXT,
  image_url VARCHAR(255)
);

-- Insert the starting data
INSERT INTO wrestlers (name, brand, description, image_url)
VALUES
('Rhea Ripley', 'Raw', 'A dominant WWE Superstar and Women\'s World Champion, admired for her power.', 'https://i.imgur.com/example.jpg'),
('Bianca Belair', 'SmackDown', 'A powerhouse athlete and multi-time Women\'s Champion, celebrated for her modern era.', 'https://i.imgur.com/example.jpg'),
('Becky Lynch', 'Raw', 'Headline of WrestleMania 35. "Becky 2 Belts". Multi-time Women\'s Champion.', 'https://i.imgur.com/example.jpg'),
('Charlotte Flair', 'SmackDown', 'One of the most decorated women in wrestling history, with 14 title reigns.', 'https://i.imgur.com/example.jpg');