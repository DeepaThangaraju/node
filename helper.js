import { client } from "./index.js";
import {ObjectId} from "mongodb";
import bcrypt from 'bcrypt';

 async function udateMovieById(id, data) {
    return await client
        .db("Movies")
        .collection("movielist")
        .updateOne({ _id: ObjectId(id) }, { $set: data });
}
 async function createMovies(data) {
    return await client.db("Movies").collection("movielist").insertMany(data);
}
async function createUser(data) {
    return await client.db("Movies").collection("users").insertOne(data);
}
async function getuserByName(username) {
   return await client
       .db("Movies")
       .collection("users")
       .findOne( {username:username});
}
 async function getMovies(filter) {
    return await client
        .db("Movies")
        .collection("movielist")
        .find(filter)
        .toArray();
}
 async function deleteMovieById(id) {
    return await client
        .db("Movies")
        .collection("movielist")
        .deleteOne({ _id: ObjectId(id) });
}
 async function getMovieById(id) {
     console.log(id);
    return await client
        .db("Movies")
        .collection("movielist")
        .findOne({ _id: ObjectId(id) });
}

async function genpassword(password){
    const rounds=10;
    const salt=await bcrypt.genSalt(rounds);
    console.log(salt);
    const hash=await bcrypt.hash(password,salt);
    return hash;
}
export { getMovies, 
    createMovies, 
    getMovieById, 
    deleteMovieById, 
    udateMovieById,
    genpassword,
createUser,
getuserByName }
