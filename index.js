// console.log("hello world");

// const [, , nums] = process.argv;
// console.log(nums);
// const arr = JSON.parse(nums);
// console.log(arr);
// console.log(Math.max(...arr));
import express, { response } from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { moviesrouter } from "./routes/movie.js";
import { getMovies, createMovies, getMovieById, deleteMovieById, udateMovieById } from "./helper.js";
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
export const client = await Createconnection();
// const express = require("express");
const app = express();
const PORT = 9000;
app.use(express.json());//every request in the app body is passed as json
//express.json is a middleware
app.get("/", (request, response) => {
    response.send("hello 🌎🎉🎉");
});




app.use("/movies",moviesrouter)
app.listen(PORT, () => console.log("App is started", PORT));

