 import mongoose from 'mongoose'
 import colors from 'colors'

 const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL
        //      {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        //     serverSelectionTimeoutMS: 30000,  
        //     socketTimeoutMS: 45000           
        // }
    )
console.log(`MongoDB connected to Database ${conn.connection.host}`.bgMagenta.white);
    }
    catch(error){
         console.log(`Error in MongoDB ${error}`.bgRed.white)
    }
 }

 export default connectDB;