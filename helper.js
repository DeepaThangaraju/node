import { client } from "./index.js";


 async function udateMovieById(id, data) {
    return await client
        .db("Movies")
        .collection("movielist")
        .updateOne({ id: id }, { $set: data });
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
        .deleteOne({ id: id });
}
 async function getMovieById(id) {
    return await client
        .db("Movies")
        .collection("movielist")
        .findOne({ id: id });
}
export { getMovies, createMovies, getMovieById, deleteMovieById, udateMovieById }
