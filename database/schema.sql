CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password TEXT NOT NULL
);

CREATE TABLE runs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  distance_km DECIMAL(6,2) NOT NULL,
  run_time INTERVAL NOT NULL,
  run_date DATE NOT NULL,
  route_image TEXT,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);