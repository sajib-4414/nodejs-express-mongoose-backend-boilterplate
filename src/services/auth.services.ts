import { IUser, User } from "../models/user.models";
import { BadRequestError, NotAuthenticatedError, ResourceNotFoundError } from "../types/error_classes";

interface IRegisterPayload{
    username:string;
    password:string;
    email:string;
    name:string;
}
export const login = async(payload:IRegisterPayload)=>{

    //extract
    const { username, password } = payload; // Destructure username

    const user:IUser|null = await User.findOne({username}).select('+password')

    if(!user){
        throw new ResourceNotFoundError("User not found")
    } 
    
    //check if password matches
    const isMatch = await user.matchPassword(password)

    if(!isMatch){
        throw new NotAuthenticatedError("Invalid credentials");
    }
    const token = generateToken(user)

    return {
        user,
        token
    };
}
//is invoked in both login and register
const generateToken = (user:IUser)=>{
    //create Token
    const token:string = user.getSignedToken()
    return token

}
export const register = async (payload:IRegisterPayload)=>{
    //we are not doing try catch for mongoose errors, mongoose errors+any errors(uncaught) are caught by express-async-errors
    //and sent to global error handler
    const user:IUser = User.build({
        username:payload.username,
        name:payload.name,
        email:payload.email,
        password:payload.password
    })
    //this is important, the user is not saved yet
    await user.save()

    //throw error if user creation fails
    if(!user){
        throw new BadRequestError("User creation failed, check data")
    }

    const token = generateToken(user)

    return {
        user,
        token
    };
}
