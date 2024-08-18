import { useState } from "react"
import {auth, googleProvider} from "../config/firbase.js"
import {createUserWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth"
function Auth(){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const emailSetter=(e)=>{
        setEmail(e.target.value);
    };
    const passwordSetter=(e)=>{
        setPassword(e.target.value);
    };
    const SignIn= async ()=>{
        try{
        await createUserWithEmailAndPassword(auth, email, password);}
        catch(err){
            console.error(err);
        }
    };
    const GoogleSignIn=async ()=>{
        try {
            await signInWithPopup(auth, googleProvider);
            
        } catch (error) {
            console.error(error);
        }
    };
    const SignOut=async ()=>{
        try {
            await signOut(auth);
            
        } catch (error) {
            console.error(error);
        }
    };
    return(
        <div className="auth">
            <input className="email" type="text" placeholder="email" onChange={(e)=>emailSetter(e)}/>
            <input className="password" type="password" placeholder="password" onChange={(e)=>passwordSetter(e)}/>
            <button className="login" onClick={()=>SignIn()}>login</button>
            <button className="GoogleSignIn" onClick={()=>GoogleSignIn()}>Sign In with Gooogle</button>
            <button onClick={()=>SignOut()}>logout</button>
        </div>
    )
}
export default Auth