//this will catch any errors(that are explicityl thrown or not handled by try catch), and handle them apprpriately 
//like sending a response to the user without crashing the server, MUST be the first line in the code
require("express-async-errors");

import express from 'express'
import { globalErrorHandler } from './middlewares/error.middlware';
import { authRouter } from './routers/auth.routes';
import { connectToMongoDB } from './config/db';
const app = express()

//parse JSON request body, maximum payload limit is 16kb, otherwise will throw error
app.use(express.json({limit:"16kb"}))

//lets also support url encoded paramters, we can do that from postman
//This option allows for rich objects and arrays to be parsed. Without this, 
//nested objects and arrays might not be parsed correctly.
//16kb  is the payload limit
app.use(express.urlencoded({extended:true, limit:"16kb"}))


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

const PORT = process.env.PORT || 3001;

//this returns a promise. unless we are waiting with await, execution will not wait here
//we are using .then and .error 
connectToMongoDB()
.then(() => {
    app.listen(PORT, () => {
        console.log('HTTP server is running at port 3001');
    });
})
.catch((error) => {
    console.error('Error connecting to mongodb, server exiting');
    console.error(error);
    process.exit(1);
});

