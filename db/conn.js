const mongoose = require('mongoose')

const DB = process.env.DATABASE;


try {
    // Connect to the MongoDB cluster
    mongoose.connect(
      DB,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log(" Mongoose is connected"),
    );
  } catch (e) {
    console.log("could not connect");
  }

const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
dbConnection.once("open", () => console.log("Connected to DB!"));














  /*
const DB = 'mongodb+srv://sanebugger:Saurav@54321@cluster0.3epv4.mongodb.net/mernstack?retryWrites=true&w=majority'; 


mongoose.connect(DB,{
  useNewUrlParser: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}).then(()=>{
  console.log(`connection successful`);
}).catch((err)=>console.log(`no connection`));
*///getting error with these commented code ,anyways :)