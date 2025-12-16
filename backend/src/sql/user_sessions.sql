CREATE TABLE user_sessions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  jwt_token_hash VARCHAR(255),
  is_active BOOLEAN DEFAULT 1,
  last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
