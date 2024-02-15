const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// const { User, Account } = require("../db");
const { PrismaClient } =  require('@prisma/client')
const prisma = new PrismaClient()
const authMiddleware = require("../middleware/authmiddleware");
const {inputValidation, credentialValidation, updateDataValidation} = require("../middleware/inputValidation");
require("dotenv").config();
const uploadRouter = require("./upload");
const imageRouter = require("./images");
const uuid = require("uuid");


// upload router

router.use("/upload", authMiddleware, uploadRouter);

// view router

router.use("/images", authMiddleware, imageRouter);

// Signup endpoint - body {firstname, lastname, username, password}

router.post("/signup", inputValidation, async (req,res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const username = req.body.username;
    const password = req.body.password;
    
    const checkUsername = await prisma.user.findFirst({
        where: {
            username
        }
    });

    if(checkUsername){
        res.status(411).json({
            message: "Username already exists"
        })
        return;
    }

    const user = await prisma.user.create({
        data: {
            id: uuid.v4(),
            firstname,
            lastname,
            username,
            password
        }
    })

    if(user){

        const token = jwt.sign({
            userId: user.id
        }, process.env.JWT_SECRET);
        
        res.json({
            message: "User created successfully",
            token,
            userId: user.id
        })

        return;
    }

    res.status(411).json({
        message: "Error while creating account"
    })

})


// Signin endpoint - body {username, password}

router.post("/signin", credentialValidation, async (req,res) => {
    
    const username = req.body.username;
    const password = req.body.password;
    
    const user = await prisma.user.findFirst({
        where: {
            username,
            password
        }
    });
    
    if(user){
        const token = jwt.sign({
            userId: user.id
        }, process.env.JWT_SECRET);
        
        res.json({
            message: "User logged in",
            token,
            userId: user.id
        })
        return;
    }
    
    res.status(411).json({
        message: "Error while logging in"
    })
})


module.exports = router