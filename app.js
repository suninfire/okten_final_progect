const http = require('http');
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');

const { PORT, MONGO_URL } = require('./config/config');
const {authRouter,drinkerRouter,tidingRouter,pubRouter,responseRouter,userRouter} = require('./routes');
const {MainErrorHandler} = require('./errors');


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// app.use('/auth',authRouter);
app.use('/drinker',drinkerRouter);
app.use('/tiding',tidingRouter);
app.use('/pub',pubRouter);
app.use('/response',responseRouter);
app.use('/user',userRouter);

app.use('*', (req,res,next) =>{
    next(new Error('Route not found'));
});

app.use(MainErrorHandler);

app.listen(PORT, () => {
    console.log('App listen', PORT);
    mongoose.set('strictQuery', true);
    mongoose.connect(MONGO_URL);
});