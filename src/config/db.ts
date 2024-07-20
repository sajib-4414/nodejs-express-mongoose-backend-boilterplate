import mongoose from 'mongoose';
import dotenv from 'dotenv'


//setting up dotenv to read .env files. without any parameter means it will read from root project diretory
dotenv.config();

const connectionString = `${process.env.CONNECTION_STRING}${process.env.DB_NAME}`

const connectToMongoDB = async()=>{
    let connectionInstance;
    try{
        if(connectionString !==null && connectionString!==undefined){
            connectionInstance = await mongoose.connect(connectionString,{
                autoIndex:true
            })
            console.info('Connected to mongodb atlas')
        }
        else{
            console.error('Cannot connect to mongodb connection string empty')
            process.exit(1);
        }
        
    }catch(error){
        console.error('Could not connect to Database, exception happened')
        console.error(error)
        process.exit(1);
    }
}
export {connectToMongoDB}
