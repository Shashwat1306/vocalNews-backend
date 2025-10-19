import mongoose,{ Schema,SchemaTypes } from "mongoose";
const userSchema=new Schema({
    'email':{type:SchemaTypes.String,required:true,unique:true},
    'password':{type:SchemaTypes.String,required:true,minLength:8},
    'name':{type:SchemaTypes.String,minLength:3},
    'role':{type:SchemaTypes.String,default:'user'},
    'regdate':{type:SchemaTypes.Date,default:Date.now},
    'status':{type:SchemaTypes.String,default:'active'},
})
export const UserModel=mongoose.model('users',userSchema);