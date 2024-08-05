import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pg;

const pool = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE
});


const testConnection = async () => {
    try {
        const client = await pool.connect();
        await client.query('SELECT NOW()');
        console.log('PostgreSQL database connected successfully');
        client.release();
    } catch (error) {
        console.error('Error connecting to PostgreSQL database:', error.message);
    }
};
testConnection();

export default pool;
