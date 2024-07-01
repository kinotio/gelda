/**
 * REALTIME SUBSCRIPTIONS
 * Only allow realtime listening on public tables.
 */
BEGIN;
  -- remove the realtime publication
  DROP publication IF EXISTS supabase_realtime;

  -- re-create the publication but don't enable it for any tables
  CREATE publication supabase_realtime;
COMMIT;

-- add tables to the publication
ALTER publication supabase_realtime ADD TABLE public.tickets;

/**
 * Seed data for 'statuses' table.
 */
INSERT INTO statuses (name) VALUES
('open'),
('in progress'),
('closed');

/**
 * Seed data for 'priorities' table.
 */
INSERT INTO priorities (name) VALUES
('low'),
('medium'),
('high'),

/**
 * Seed data for 'resolutions'  table.
 */
INSERT INTO resolutions (name) VALUES
('resolved'),
('unresolved');

/**
 * Seed data for 'roles' table.
 */
INSERT INTO roles (name) VALUES
('client'),
('admin');

/**
 * Seed data for 'users' table with hashed passwords for admin and client role.
 * For information the password is `admin` for admin and 'client' for client.
 */
INSERT INTO users (name, email, hashed_password, role_id) VALUES
('Admin', 'admin@gelda.com', '$2b$10$C800hKTte/u9CocO2Vsvy.BJUN6pgMUo3weM47gO7V2Xy45/ab2ma', (SELECT id FROM roles WHERE name = 'admin')),
('Client', 'client@gelda.com', '$2b$10$COLq6beejO2B3rYEctCbeOKjwAcY8VZNMG7jclvxl.amE5WE6uSFu', (SELECT id FROM roles WHERE name = 'client'));
