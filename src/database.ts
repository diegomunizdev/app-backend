import mongoose from 'mongoose';

const database: string = process.env.CONNECTION_DATABASE ? process.env.CONNECTION_DATABASE : ''

mongoose.connect(database, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(result => {
    console.log('>>> Database successfully connected')
}).catch(err => {
    console.log('xxx Failure. Could not connect to the databse. Error: ', err);
})