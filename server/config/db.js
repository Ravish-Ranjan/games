import {MongoClient} from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()
let db;
const connectToDb = (cb) => {
    MongoClient.connect(process.env.DB).then(client => {
        db = client.db();
        return cb();
    }).catch(err => {
        return cb(err)
    })
}
const getDb = () => {
    return db;
}
export { connectToDb, getDb }