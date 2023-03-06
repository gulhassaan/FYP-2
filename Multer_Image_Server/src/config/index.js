import dotenv from 'dotenv';

const { parsed } = dotenv.config();
export const PORT = process.env.PORT || parsed.PORT;

export const baseURL = `http://localhost:${PORT}`;
