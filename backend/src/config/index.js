import { config } from 'dotenv';

const { parsed } = config();

export const {
    PORT,
    MODE,
    IN_PROD = MODE !== 'prod',
    DATABASE,
    BASE_URL,
    SECRET,
    URL = `${BASE_URL}${PORT}`
} = parsed  