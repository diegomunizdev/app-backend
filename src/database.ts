import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(db => {
    console.log('>>> Banco de Dados está conectado!')
}).catch(err => {
    console.log('Não foi possível estabelecer uma conexão com o Banco de Dados. Error: ', err);
})