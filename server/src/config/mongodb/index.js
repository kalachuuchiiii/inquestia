const mongoose = require("mongoose"); 

exports.connectDB = async() => {
  try{
    const connectionString = process.env.MONGODB_KEY; 
    if(!connectionString){
      throw new Error("DB Connection String is missing.");
    }
  const connection = await mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000, // or higher
  });

    console.log("Mongo DB Connected");
    return connection; 
  }catch(e){
    console.error(e);
    process.exit(1);
  }
}