import dotenv from 'dotenv';

// load environment variables
dotenv.config();

// export app settings
export const NODE_ENV: string = process.env.NODE_ENV || 'development';
export const PORT: string = process.env.PORT || '3000';

// export DB settings
export const DB_HOST: string = process.env.MYSQL_DB_PORT || '127.0.0.1';
export const DB_PORT: number = parseInt(process.env.MYSQL_DB_PORT || '3306');

export const DB_NAME: string = process.env.MYSQL_DB_NAME || '';
export const DB_USER: string = process.env.MYSQL_DB_USER || '';
export const DB_PASSWORD: string = process.env.MYSQL_DB_PASSWORD || '';

export const DB_CONNECTION_LIMIT: number = parseInt(process.env.MYSQL_DB_CONNECTION_LIMIT || '10');
