import { client } from "./index.js";
import {ObjectId} from "mongodb"

 async function udateMovieById(id, data) {
    return await client
        .db("Movies")
        .collection("movielist")
        .updateOne({ _id: ObjectId(id) }, { $set: data });
}
 async function createMovies(data) {
    return await client.db("Movies").collection("movielist").insertMany(data);
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
export { getMovies, createMovies, getMovieById, deleteMovieById, udateMovieById }
