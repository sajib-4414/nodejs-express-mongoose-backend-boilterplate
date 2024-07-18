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
