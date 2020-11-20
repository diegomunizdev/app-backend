import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT ? process.env.PORT : '4000'

import app from './app';
import './database';

function main() {
    app.listen(PORT);
    console.log(`Server running: http://localhost:${PORT}`);
}

main();