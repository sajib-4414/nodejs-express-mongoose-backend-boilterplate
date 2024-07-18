//this will catch any errors(that are explicityl thrown or not handled by try catch), and handle them apprpriately 
//like sending a response to the user without crashing the server, MUST be the first line in the code
require("express-async-errors");

import express from 'express'
import { globalErrorHandler } from './middlewares/error.middlware';
import { authRouter } from './routers/auth.routes';
import { connectToMongoDB } from './config/db';
const app = express()

//parse JSON request body
app.use(express.json())



//connect to mongodb
connectToMongoDB()


const cors = require('cors')
app.use(cors())//using default settings, CORS-> Allow all server

const router = express.Router(); // Create a new root router for mounting
// Mount auth and all routers onto the root router
router.use('/auth', authRouter);


//the backend request path will be now,
//domain-name/api/auth/auth related routes
//domain-name/api/message/message related routes
app.use('/api',router)

//global error handler, It must be placed after all routes, controllers are assigned to app instance,
//that intercept any error that happens in the request response cycle
app.use(globalErrorHandler)



app.listen(3001, ()=>{
    console.log('http server is running at 3001 port')
})