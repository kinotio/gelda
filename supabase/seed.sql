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
