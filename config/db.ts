import mongoose from 'mongoose';
import {environment} from "../environment"
export const connection = async() =>{
   
    //  var connectionString = `mongodb://localhost:27017/rainmaker`;
     var connectionString:string =environment.db_url;
   
    //  console.log({connectionString})
    //  var connectionString:string ="mongodb+srv://sachin:URnb17mqFrVFqnT2@cluster0.fsuun.mongodb.net/rainMaker?retryWrites=true&w=majority"
    await mongoose.connect(environment.db_url)
      mongoose.connection.on('connected', function () {
     console.log(`****************************************************\n****************************************************\n******************* ${'working DB'} *******************\n****************************************************\n****************************************************
     `)
    });
    mongoose.connection.on('error', function (err) {
        console.log(("Mongoose default connection has occured " + err + " error"));
    });
        mongoose.connection.on('disconnected', function () {
        console.log(("Mongoose default connection is disconnected"));
        process.exit(1)
    });
    
}


export const conn = mongoose.connection;

