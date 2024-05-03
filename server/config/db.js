import {MongoClient} from 'mongodb'

let db;
const connectToDb = (cb) => {
    MongoClient.connect("mongodb+srv://nimcetafh:kxRWF6FphzrFPyIu@socetcluster.bpfi33m.mongodb.net/Game").then(client => {
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