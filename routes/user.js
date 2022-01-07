import express from "express";
import { createUser, genpassword, getuserByName } from "../helper.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = express.Router();
router
.route("/signup").post( async (request, response) => {
    const {username,password} = request.body;
    const getUserfromDB=await getuserByName(username);
    
    if(getUserfromDB){
        response.status(400).send({message:"username already exist"});
        return;
    }
    if(password.length<8){
        response.status(400).send({message:"Password must be longer"});
        return;
    }
    if(!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@!#%&]).{8,}$/g.test(password)){
        response.status(400).send({message:"Password must be strong"});
        return;
    }
    const hashedpassword=await genpassword(password);
    const result=await createUser({username,password:hashedpassword})
    response.send(result);
    //go to postman and get copy of movie and select the body,raw
    //and json paste it and send it
});
router
.route("/signin").post( async (request, response) => {
    const {username,password} = request.body;
    const getUserfromDB=await getuserByName(username);
    
    if(!getUserfromDB){
        response.status(400).send({message:"Invalid Credentials"});
        return;
    }
    const storedpassword=getUserfromDB.password;
    console.log(storedpassword);
    const isPasswordMatch=await bcrypt.compare(password,storedpassword);
    console.log(isPasswordMatch);
    if(isPasswordMatch){
        const token=jwt.sign({id:getUserfromDB._id},process.env.SECRET_KEY);
        response.send({message:"Successfully loggedin",token:token});
        return
    }else{
        response.status(401).send({message:"Invalid Credentials"});
        return;
    }
response.send(getUserfromDB)
});

export const userrouter=router;