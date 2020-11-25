import mongoose, { Connection, Mongoose } from "mongoose";

const database: string = process.env.CONNECTION_DATABASE ? process.env.CONNECTION_DATABASE : ''

const options: mongoose.ConnectionOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}

function connection(): Promise<Connection> {
    return new Promise<Connection>((resolve, reject) => {
        mongoose.connect(database, options)
            .then((result: Mongoose) => {
                resolve(result.connection)
                console.log('>> DATABASE SUCCESSFULLY CONNECTED')
            }).catch(err => {
                reject(err)
                console.log('xxx Failure. Could not connect to the databse. Error: ', err);
            })
    })
}

connection()