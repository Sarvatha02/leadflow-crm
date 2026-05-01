CREATE TABLE IF NOT EXISTS leads (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    source VARCHAR(50) CHECK (source IN ('Call', 'WhatsApp', 'Field')),
    status VARCHAR(50) CHECK (status IN ('Interested', 'Not Interested', 'Converted')) DEFAULT 'Interested',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
