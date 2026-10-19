CREATE TABLE IF NOT EXISTS clients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(30) UNIQUE NOT NULL,
  last_visit DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS treatments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  name_ar VARCHAR(150),
  default_sessions INTEGER DEFAULT 1,
  interval_days INTEGER DEFAULT 30,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS specialists (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  specialty VARCHAR(150),
  specialty_ar VARCHAR(150),
  is_active BOOLEAN DEFAULT TRUE,

  services JSONB DEFAULT '[]',
  schedule JSONB DEFAULT '{}',

  created_at TIMESTAMPTZ DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS appointments (
  id SERIAL PRIMARY KEY,

  client_id INTEGER
    REFERENCES clients(id)
    ON DELETE SET NULL,

  treatment_id INTEGER
    REFERENCES treatments(id)
    ON DELETE SET NULL,

  specialist_id INTEGER
    REFERENCES specialists(id)
    ON DELETE SET NULL,

  appointment_date DATE NOT NULL,
  appointment_time VARCHAR(20) NOT NULL,

  status VARCHAR(30)
    DEFAULT 'pending'
    CHECK (
      status IN (
        'pending',
        'confirmed',
        'completed',
        'cancelled'
      )
    ),

  source VARCHAR(50) DEFAULT 'website',

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS treatment_plans (
  id SERIAL PRIMARY KEY,

  client_id INTEGER NOT NULL
    REFERENCES clients(id)
    ON DELETE CASCADE,

  treatment_id INTEGER NOT NULL
    REFERENCES treatments(id),

  specialist_id INTEGER
    REFERENCES specialists(id)
    ON DELETE SET NULL,

  total_sessions INTEGER NOT NULL,
  completed_sessions INTEGER DEFAULT 0,

  start_date DATE,
  last_session DATE,
  next_suggested DATE,

  interval_days INTEGER DEFAULT 30,

  areas JSONB DEFAULT '[]',

  created_at TIMESTAMPTZ DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS sessions (
  id SERIAL PRIMARY KEY,

  treatment_plan_id INTEGER NOT NULL
    REFERENCES treatment_plans(id)
    ON DELETE CASCADE,

  session_date DATE NOT NULL,

  session_number INTEGER NOT NULL,

  specialist_id INTEGER
    REFERENCES specialists(id)
    ON DELETE SET NULL,

  notes TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW()
);