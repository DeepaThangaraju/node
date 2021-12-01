// console.log("hello world");

// const [, , nums] = process.argv;
// console.log(nums);
// const arr = JSON.parse(nums);
// console.log(arr);
// console.log(Math.max(...arr));
import express, { response } from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env);//put all key value pairs in the process.env
const movies = [{
    id: "100",
    name: "Doctor",
    rating: 8.5,
    description: "Doctor is a 2021 Indian Tamil-language action-comedy thriller film directed by Nelson Dilipkumar. The film stars Sivakarthikeyan who also produced it under his banner Sivakarthikeyan Productions, whereas KJR Studios served as the co-producer and distributor.",
    poster: "https://i2.wp.com/www.socialnews.xyz/wp-content/uploads/2020/02/17/SivaKarthikeyan-s-Doctor-Movie-First-Look-HD-Posters-.jpg?quality=90&zoom=1&ssl=1",
    trailer: "https://www.youtube.com/embed/oQiH_Iw0kDs",
    language: "tamil"
},
{
    id: "101",
    name: "Tangled",
    rating: 7.7,
    description: "The film is telling the story of the long-lost princess Rapunzel, who yearns to leave the confines of her secluded tower for an adventure. Against her foster mother's wishes, she accepts the aid of a handsome intruder, Flynn Rider, to take her out into the world which she has never seen.",
    poster: "https://i.pinimg.com/originals/4a/c1/60/4ac1603157230f9a3622e388bf997b34.jpg",
    trailer: "https://www.youtube.com/embed/JYKpIr1lSG0",
    language: "english"
},
{
    id: "102",
    name: "Fast and Furious 6",
    rating: 7,
    description: "In the film, Dominic Toretto, Brian O'Conner, and the team are offered amnesty for their past crimes in exchange for apprehending a mercenary organization, one member of which is Toretto's presumed deceased lover and wife, Letty Ortiz.",
    poster: "https://d9nvuahg4xykp.cloudfront.net/4508989947247677680/185521559806925170.jpg",
    trailer: "https://www.youtube.com/embed/RMmLTmjXKH8",
    language: "english"
},
{
    id: "103",
    name: "Master",
    rating: 7.8,
    description: "Master is a 2021 Indian Tamil-language action thriller film written and directed by Lokesh Kanagaraj. ... The film revolves around an alcoholic professor, J. D. (Vijay), who takes a three-month teaching job in a juvenile home, unbeknownst to him.",
    poster: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202001/Master_2.jpeg?8rcC0rlw0oakojvuh12Y8RNG04grcC4u&size=1200:675",
    trailer: "https://www.youtube.com/embed/wNWKwjWjWcY ",
    language: "tamil"
},
{
    id: "104",
    name: "Ice Age",
    rating: 7.5,
    description: "On Earth 20,000 years ago, everything was covered in ice. A group of friends, Manny, a mammoth, Diego, a saber tooth tiger, and Sid, a sloth encounter an Eskimo human baby. They must try to return the baby back to his tribe before a group of saber tooth tigers find him and eat him.",
    poster: "https://i.pinimg.com/originals/1a/94/79/1a947934e608f510eb5b7160074793f1.jpg",
    trailer: "https://www.youtube.com/embed/i4noiCRJRoE",
    language: "english"
},
{
    id: "105",
    name: "Boss Baby",
    rating: 6.3,
    description: "The first installment in The Boss Baby franchise, the plot follows a boy helping his baby brother who is a secret agent in the war for adults' love between babies and puppies. The Boss Baby premiered at the Miami International Film Festival on March 12, 2017, and was released in the United States on March 31.",
    poster: "https://picfiles.alphacoders.com/107/thumb-107066.jpg",
    trailer: "https://www.youtube.com/embed/k397HRbTtWI",
    language: "english"
},
]
// const MONGO_URL = "mongodb://localhost";
const MONGO_URL = process.env.MONGO_URL;
//mongodb+srv://deepa:<password>@cluster0.bacm4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
async function Createconnection() {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("mongodb connect");
    return client;
}
const client = await Createconnection();
// const express = require("express");
const app = express();
const PORT = 9000;
app.use(express.json());//every request in the app body is passed as json
//express.json is a middleware
app.get("/", (request, response) => {
    response.send("hello 🌎🎉🎉");
});

app.get("/movies", async (request, response) => {
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
});
app.post("/movies", async (request, response) => {
    const data = request.body;
    console.log(data);
    const result = await createMovies(data);
    response.send(result);
    //go to postman and get copy of movie and select the body,raw
    //and json paste it and send it
});
app.get("/movies/:id", async (request, response) => {
    const { id } = request.params;
    console.log(id);
    const movie = await getMovieById(id);
    // // const movie = movies.filter((data) => (data.id === id))[0];
    // const movie = movies.find((data) => (data.id === id));
    // if (movie != undefined)
    //     response.send(movie);
    // else response.send("movie not found");
    movie ? response.send(movie) : response.status(404).send({ message: "movie not found" });
});


app.delete("/movies/:id", async (request, response) => {
    const { id } = request.params;
    console.log(id);
    const Deletedmovie = await deleteMovieById(id);
    Deletedmovie.deletedCount>0
     ? response
    .send(Deletedmovie) : response.status(404)
    .send({ message: "movie not found" });
});

app.put("/movies/:id", async (request, response) => {
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
app.listen(PORT, () => console.log("App is started", PORT));
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

