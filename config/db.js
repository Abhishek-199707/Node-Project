const mongoose = require('mongoose');
const colors = require('colors')


const connectDb = async()=>{
   try{
    await mongoose.connect(process.env.MONGO_URL)
    console.log(`Connect to server ${mongoose.connection.host}`.bgGreen)
  }
  catch(error){
    console.log('something went wrong', error)
  }
}

module.exports= connectDb;