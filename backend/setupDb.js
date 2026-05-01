const { Client } = require('pg');

const runSetup = async () => {
    // Connect to default postgres DB to create our new database
    const client = new Client({
        user: 'postgres',
        password: 'Geetha@123',
        host: 'localhost',
        port: 5432,
        database: 'postgres'
    });

    try {
        await client.connect();
        console.log('Connected to PostgreSQL default database.');

        const res = await client.query(`SELECT datname FROM pg_catalog.pg_database WHERE datname = 'lead_db'`);
        if (res.rowCount === 0) {
            await client.query(`CREATE DATABASE lead_db;`);
            console.log('Created database lead_db.');
        } else {
            console.log('Database lead_db already exists.');
        }
    } catch (err) {
        console.error('Error creating database:', err);
    } finally {
        await client.end();
    }

    // Connect to the newly created DB to create tables
    const clientDb = new Client({
        user: 'postgres',
        password: 'Geetha@123',
        host: 'localhost',
        port: 5432,
        database: 'lead_db'
    });

    try {
        await clientDb.connect();
        console.log('Connected to lead_db database.');

        await clientDb.query(`
            CREATE TABLE IF NOT EXISTS leads (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                phone VARCHAR(50) NOT NULL,
                source VARCHAR(50) CHECK (source IN ('Call', 'WhatsApp', 'Field')),
                status VARCHAR(50) CHECK (status IN ('Interested', 'Not Interested', 'Converted')) DEFAULT 'Interested',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('Created leads table.');
    } catch (err) {
        console.error('Error creating table:', err);
    } finally {
        await clientDb.end();
    }
};

runSetup();
