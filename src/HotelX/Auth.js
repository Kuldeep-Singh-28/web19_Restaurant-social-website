import React from "react";
import { provider } from "./firebase";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import db from "./firebase";
import Hotel from "./Hotel";
const auth = firebase.auth();
function Auth() {
    const [user] = useAuthState(auth);
    const database = db.collection("users");
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
    function SignOut() {
        return (
            auth.currentUser && (
                <button className="sign-out" onClick={() => auth.signOut()}>
                    Sign Out
                </button>
            )
        );
    }
    return (
        <div>
            <SignOut />
            {user ? <Hotel user={user} /> : <SignIn />}
        </div>
    );
}

export default Auth;
