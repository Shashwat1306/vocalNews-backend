import {register as registerUser } from "../services/user-service.js";
import { login as loginUser } from "../services/user-service.js";

export const login = async (req,res)=>{
    const userObject=req.body;
    try{
        const result=await loginUser (userObject);
        res.status(200).json(result);
    }
    catch(error){
        res.status(500).json({message:error.message});
        console.log(error);
    }
}
export const register = async (req,res)=>{
    console.log('DATA RECEIVED IN CONTROLLER:', req.body);
    const userData=req.body;    
    try{
        const result=await registerUser(userData);
        res.status(200).json(result);
    }
    catch(error){
        res.status(500).json({message:error.message});
        console.log("caught in controller",error);
    }
}
export const profile = async (req,res)=>{
    res.json({message:'profile'});
}