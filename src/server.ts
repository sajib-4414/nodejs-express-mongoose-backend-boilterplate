import { app } from "./app";
import { connectToMongoDB } from "./config/db";

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