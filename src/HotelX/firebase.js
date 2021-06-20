import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyAfG7Kb-9zdczf-lOORIvQigIuuYGHTHOY",
    authDomain: "hotelwebx.firebaseapp.com",
    projectId: "hotelwebx",
    storageBucket: "hotelwebx.appspot.com",
    messagingSenderId: "708752405269",
    appId: "1:708752405269:web:73b8b92ab8b5dc77032f1c",
    measurementId: "G-T6RKHY9MB2"
};
firebase.initializeApp(firebaseConfig);
export var provider = new firebase.auth.GoogleAuthProvider();
export var storage = firebase.storage();
var db = firebase.firestore();
export default db;
