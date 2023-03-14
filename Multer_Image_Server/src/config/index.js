import dotenv from 'dotenv';

const { parsed } = dotenv.config();
export const PORT = process.env.PORT || 4000;

export const baseURL = `http://localhost:${PORT}`;
