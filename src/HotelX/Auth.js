import React from "react";
import { provider } from "./firebase";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import db from "./firebase";
import Homepage from "./Homepage"
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
    function SignIn() {
        return (
            <button onClick={(e) => signup(e)} className="SignInButt">
                signIn
            </button>
        );
    }
    return (
        <div>
            {user ?<Homepage/> : <SignIn/>}
        </div>
    );
}
export  var user;
export default Auth;
