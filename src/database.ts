import mongoose, { Mongoose } from 'mongoose';
import { Request, Response } from 'express';

const database: string = process.env.CONNECTION_DATABASE ? process.env.CONNECTION_DATABASE : ''

mongoose.connect(database, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then((result: Mongoose) => {
    result.connection
    console.log('>>> Banco de Dados está conectado!')
}).catch(err => {
    console.log('Não foi possível estabelecer uma conexão com o Banco de Dados. Error: ', err);
})