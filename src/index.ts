import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import './database';

function main() {
    app.listen(app.get('port'));
    console.log('> Servidor rodando na porta', app.get('port'));
}

main();