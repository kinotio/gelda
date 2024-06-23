-- Seed data for 'status' table
INSERT INTO status (name) VALUES
('open'),
('in progress'),
('closed');

-- Seed data for 'priorities' table
INSERT INTO priorities (name) VALUES
('low'),
('medium'),
('high'),
('urgent');

-- Seed data for 'resolutions'  table
INSERT INTO resolutions (name) VALUES
('resolved'),
('unresolved');

-- Seed data for 'roles' table
INSERT INTO roles (name) VALUES
('client'),
('admin');

-- Seed data for 'users' table with hashed passwords for admin role
-- For information the password is `admin`
INSERT INTO users (name, email, hashed_password, role_id) VALUES
('Admin', 'admin@gelda.com', '$2b$10$zl3gugUjFEji1RXysQyMTOTDQyVBM2h0s2nGTTKtjWYmXSYzztvvG', (SELECT id FROM roles WHERE name = 'admin'));
