import mongoose from "mongoose";
import  bcrypt  from "bcryptjs";
import jwt from 'jsonwebtoken'
interface IUser extends mongoose.Document{
    username:string,
    _id?:string,
    name:string,
    email:string,
    password:string,
    getSignedToken:()=>string,
    matchPassword: (password:string) => boolean;
    createdAt:Date,
    updatedAt:Date,
}
interface UserAttrs{
    username:string,
    name:string,
    email:string,
    password:string,
}

const userSchema = new mongoose.Schema<IUser>({
    username:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        match:[
             /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please add a valid email'
        ],
        required: [true, 'Please add a valid email'],
        unique:true
    },
    password:{
        type:String,
        required: [true, 'Please enter a password'],
        minlength:4,
        select:false //password will not come to the json response unless selected explicitly.
    }
},{timestamps: true})

//before saving user, modify the password to have encrypted password stored
//in schema methods, with the "this" we have refrence to the current object
userSchema.pre('save', async function name(next) {
    // only encrypt if password was changed or added(register)
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.getSignedToken = function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET!,{
        expiresIn: process.env.JWT_EXPIRE!
    })
}

userSchema.methods.matchPassword = async function (enteredPassword:string) {
    return await bcrypt.compare(enteredPassword, this.password) 
}

userSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id; //deleting mongoose _id key from json output, we will show the id key instead
        delete ret.__v; //also deleting _v version key from json output
    }
}); 

/*adding a static build method to the user
 we will call this build method to create user isntead of using User.create({})
this wil do the validation with typescript, we can see the parameters as well*/
userSchema.statics.build = (attrs: UserAttrs)=>{
    return new User(attrs)
}

interface IUserMethods extends mongoose.Model<IUser>{
    //we can add static methods here for the model
    build(attrs:UserAttrs): IUser;//when we will call build, it will return a user document
}
const User = mongoose.model<IUser, IUserMethods>('User', userSchema)

export {User, IUser}