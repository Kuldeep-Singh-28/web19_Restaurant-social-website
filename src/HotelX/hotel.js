import React, { useEffect } from "react";
import db, { provider, storage } from "./firebase";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
const auth = firebase.auth();

function Hotel({ user }) {
    useEffect(async () => {
        const x = (await db.collection("users").doc(user.uid).get()) != null;
        if (x == true) {
            await db.collection("users").doc(user.uid).set({
                CreatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                username: user.displayName,
                photo: user.photoURL,
                email: user.email,
            });
        }
    }, [user]);
    const upload = (e) => {
        var file = e.target.files[0];
        var Storage = storage.ref("images" + file.name);
        Storage.put(file);
    };
    return (
        <div>
            hello
            <input type="file" onChange={(e) => upload(e)} />
        </div>
    );
}

export default Hotel;

