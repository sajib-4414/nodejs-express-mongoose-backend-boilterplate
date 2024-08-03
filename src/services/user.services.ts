import { User } from "../models/user.models";

export const getAllDBUsers = async ()=>{
    const users = await User.find({});
    return users;
}