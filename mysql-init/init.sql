CREATE DATABASE IF NOT EXISTS wwe_db;
USE wwe_db;

CREATE TABLE IF NOT EXISTS wrestlers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(255),          
  description TEXT,
  image_url VARCHAR(255)      
);

INSERT INTO wrestlers (name, brand, description, image_url)
VALUES
(
  'Becky Lynch',
  'The Man of WWE',
  'Headline of WrestleMania 35. ''Becky 2 Belts''. Multi-time Women''s Champion.',
  '/images/becky.jpg'
),
(
  'Charlotte Flair',
  'The Queen Of WWE',
  'One of the most decorated women in wrestling history, with multiple championship reigns, 14 titles.',
  '/images/charlotte.jpg' 
),
(
  'Bianca Belair',
  'The EST of WWE',
  'A powerhouse athlete and multi-time Women''s Champion, admired for her power. Longest reigning modern era.',
  '/images/bianca.jpg' 
),
(
  'Rhea Ripley',
  'MOMMY Of WWE',
  'A dominant WWE Superstar and Women''s World Champion, admired for her power, unique style. A member of The Judgment Day.',
  '/images/rhea.jpg' 
);