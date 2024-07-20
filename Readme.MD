# Nodejs Express TypeScript Mongoose Backend boilerplate application
The goal of this project is to have a boilerplate backend structure and example of standard best practices, such that we can flawlessly use it to quickly start a project. Feel free to use in your project. Create pull request for any improvement you are contributing.

### Installation:
* clone the project
* run `npm install`, then `npm run dev`

## Technologies used in the BoilerPlate.

### Packages
Look at the package.json to know which version is it.
* Nodejs
* Express
* Typescript
* nodemon for Hot loading
* Mongoose ORM
* Express Validator
* Jest (TODO)
* Express Async Errors to catch all thrown and unhandled errors
* Docker (TODO)
* Github Action Workflows (TODO)
* Cookie parsing, and cookie based authentication with token(TODO)
* CORS
* dotenv to load .env file with variables
* Linting packages (TODO)
* Background worker package such as bulljs(TODO)
* Logging tools(TODO)

### Strcutures used

* Error Handling Class, to characterize common errors and send proper response. Also it sends a consistent format response.
* Global Error Middleware to catch all errors, and handle most of the errors properly.
* Using express async error library to catch all unhandled/thrown errors so that error handler.

* Individual Route definitions to make the routes clean
* Validating Request payloads with express validator.
* Validating Request payloads with Joi(TODO)
* Testcase writing with Jest (TODO)
* Pagination example with mongoose.(TODO)
* JWT login example.
* Mongoose model definition with builder model, and standard system of defining as object.
* CORS to configure CORS settings, means which hosts to allow access resources.
* using a db.ts to configure database
* authorized Request Middlware, that will add a req.user to the request so that controller can use it.
* Using mongodb timestamp true to have createdAt, UpdatedAt automatically done by mongoose.

## How To Guidelines

### setup express, typescript project with nodemon
* create project with `npm init -y`
* Install typescript , nodemon, ts-node, node types, express types as dev dependencies.
```
npm install ts-node typescript nodemon @types/node @types/express --save-dev
```
All the types, hotloading packages should go into development only
* create a folder called src
* create a minimal tsconfig.json, then use this basic configuration. root directory for codes is src, using strict typescript type. module commonjs part's explanation will be added later.
```
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./src",
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}
```
*   we will use nodemon for hot reloading in package.json.To run the project with nodemon, and ts-node, set a development command to run the project,
```  
"scripts": {
    "dev": "nodemon --exec ts-node src/index.ts"
}
```
Now run the project with `npm run dev`

### Error Handling:
we are not doing try catch for almost all errors in controllers, service. because mongoose errors+any errors(uncaught) are caught by express-async-errors
and sent to global error handler
### Model with mongoose:

### Route, Middleware, Controller, Services
I broke down the API into 4 parts. 
* **Route file** should contain only routing paths. Validation logic wil go to helper files, such as the express validation chains to validate payloads.
* **Middleware**: Any validation logic that request need to pass is in middlware. In route definition, we specify the middleware after the route name.
* **Controller**: It will have the (req,res) methods that will return json responses.
* **Services**: Any Database operations, complex business logic should go into service methods.

### JWT token implementation:
will be added

### Cookie based authentication:
will be added soon.

### How to create a mongoose model in a standard way
will be added soon.

### Add a middlware for authenticated request and have req.user
```
# in auth.middleware.ts

// This is a global namespace modification, so any request will be modified and will have set a currentUser
THis is done such as Typescript understands there is user in request object
declare global {
    namespace Express {
      interface Request {
        user: IUser;
      }
    }
}
export const authorizedRequest = async(req:Request, res:Response, next:NextFunction)=>{
    let token:any;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
        //set token from bearer token in header
        token = req.headers.authorization.split(' ')[1];
    }
    //if the token is sent via cookie
    else if (req.cookies.token){
        token = req.cookies.token
    }

    //Make sure token is a non empty non null one
    if(token === undefined || !token)
        throw new NotAuthenticatedError('Not authenticated...')
    try{
        //verify the token
        const decoded:JwtPayload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
        console.log(decoded)
        const user = await User.findById(decoded.id)
        if (user)
            req.user = user
        next()
    }
    catch(err){
        console.log(err)
        throw new NotAuthenticatedError('Not authenticated...')
    }
}
```

Now in the routes definition
```
router.post('/add-socket', authorizedRequest, controllerName)
```

in the controller,
```
import {  Request, Response } from "express";
export const joinAllRooms = async(req:Request, res:Response)=>{
    ....
    await someMethod(req.user, socketId) # req.user can be accessed
    ....
}
```
### How to support JSON request and URL encoded paramter parsing?
in `index.ts`
```
//parse JSON request body, maximum payload limit is 16kb, otherwise will throw error
app.use(express.json({limit:"16kb"}))

//lets also support url encoded paramters, we can do that from postman
//This option allows for rich objects and arrays to be parsed. Without this, 
//nested objects and arrays might not be parsed correctly.
//16kb  is the payload limit
app.use(express.urlencoded({extended:true, limit:"16kb"}))
```

### How to use dotenv to use variables from .env files
- install `dotenv`
- have a file in the project named .env
- the .env file should not contain any spaces, for string use quote notation. example of a .env file
`JWT_SECRET='1234'`
- in the file where want to use variables with `process.env`
do this
```
import dotenv from 'dotenv'
dotenv.config(); //you can optionally give path, if your .env is not in the **project** root.
console.log(process.env.JWT_SECRET)
```
There should be a way to load the dotenv load globally such that we dont have to use `dotenv()` in all files
where we want to use `env` variables. I will post it later.
