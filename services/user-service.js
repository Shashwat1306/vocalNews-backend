import {UserModel} from "../models/user-model.js";
import {compareHash,encryptPassword} from "../utils/services/password-hash.js";
import {generateToken} from "../utils/services/token.js";

export const register=async(userObject)=>{
    try{
        userObject.password=await encryptPassword(userObject.password);
        const doc=await UserModel.create(userObject);
        if(doc && doc._id){
            return "user registered successfully";
        }
    }
    catch(error){
        throw error;
    }   
}

export const login=async(userObject)=>{
    try{
        const doc=await UserModel.findOne({email:userObject.email}).exec();
        if(doc && doc._id){
            if(compareHash(userObject.password,doc.password)){
                const token=generateToken(doc.email);
                return {message:"Welcome "+doc.name,token:token};
            }
            else{
                return {message:"Invalid credentials"};
            }
        }
        else{
            return "Invalid Email or password";
        }
    }
    catch(error){
        throw new Error("INVALID CREDENTIALS");
    }
}

