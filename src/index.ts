import dotenv from 'dotenv';

import app from './app';
dotenv.config();
import './database';

const PORT = process.env.PORT || '3001';

function main() {
    app.listen(PORT, () => {
        console.log(`>> Server running: http://localhost:${PORT} <<`);
    });
}

main();