import React from "react";
import { provider } from "./firebase";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Homepage from "./Homepage"
import "./styles/auth.css"
const auth = firebase.auth();
function Auth() {
    const [user] = useAuthState(auth);
    const signup = async (e) => {
        e.preventDefault();
        firebase
            .auth()
            .signInWithPopup(provider)
            .then(async (result) => {
                var credential = result.credential;
                var token = credential.accessToken;
                var user = result.user;
                console.log(user);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
            });
    };
    console.log(user);
    function SignIn() {
        return (
            <button onClick={(e) => signup(e)} className="SignInButt">
                signIn
            </button>
        );
    }
    return (
        <div className="_auth">
            
            {user ?<Homepage/> : <SignIn/>}
        </div>
    );
}
export  var user;
export default Auth;
