BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS login (
  id SERIAL PRIMARY KEY,
  hash VARCHAR(100) NOT NULL,
  email TEXT UNIQUE NOT NULL
);

COMMIT;