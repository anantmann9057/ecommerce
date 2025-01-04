import mongoose from "mongoose";

const uri = 'mongodb://localhost:27017/e-commerce';

if(!uri) throw new Error("No Database Found!");

export const dbConnect =()=>{
    mongoose.connect(uri).then(()=>{
        console.log('server started!')
    }).catch((e)=>{
        console.log(e);
    });
}