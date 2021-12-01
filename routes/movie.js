import express from "express";
import { getMovies, createMovies, getMovieById, deleteMovieById, udateMovieById } from "../helper.js";
const router = express.Router();
router
.route("/").get( async (request, response) => {
    const filter = request.query;
    console.log(filter);
    if (filter.rating) {
        filter.rating = parseFloat(filter.rating);
    }

    // let filteredmovie = movies;
    // if (language) {
    //     filteredmovie = filteredmovie.filter((data) => (data.language === language));

    // }
    // if (rating) {
    //     filteredmovie = filteredmovie.filter((data) => data.rating === +rating);
    //     console.log(rating);
    // }
    const filteredmovie = await getMovies(filter);
    //curser to array(only 20 will return to written all we  convert to array)
    // console.log(filteredmovie);
    response.send(filteredmovie);
}).post( async (request, response) => {
    const data = request.body;
    console.log(data);
    const result = await createMovies(data);
    response.send(result);
    //go to postman and get copy of movie and select the body,raw
    //and json paste it and send it
});
router
.route("/:id").get( async (request, response) => {
    const { id } = request.params;
    console.log(id);
    const movie = await getMovieById(id);
    // // const movie = movies.filter((data) => (data.id === id))[0];
    // const movie = movies.find((data) => (data.id === id));
    // if (movie != undefined)
    //     response.send(movie);
    // else response.send("movie not found");
    movie ? response.send(movie) : response.status(404).send({ message: "movie not found" });
})
.delete( async (request, response) => {
    const { id } = request.params;
    console.log(id);
    const Deletedmovie = await deleteMovieById(id);
    Deletedmovie.deletedCount>0
     ? response
    .send(Deletedmovie) : response.status(404)
    .send({ message: "movie not found" });
})
.put( async (request, response) => {
    const { id } = request.params;
    console.log(id);
    const data=request.body;
    const updatedmovie = await udateMovieById(id, data);
    const data1=await getMovieById(id);
    response.send(data1)
    // Deletedmovie.deletedCount>0
    //  ? 
    //  response.send(Deletedmovie) : response.status(404)
    // .send({ message: "movie not found" });
});

export const moviesrouter=router;