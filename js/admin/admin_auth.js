import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";

import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  setDoc,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  deleteField,
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";

import { firebaseConfig } from "../firebase.js";
console.log("working");
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// login and redirect

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    var uid = user.uid;
    var email = user.email;
    console.log(user);
    //   window.location = "admin/admin_dashboard.html";
    document.getElementById("username").innerHTML = email;
    // console.log(document.getElementsById("username").innerHTML);
    console.log(uid);

    var logout = document.getElementById("logout");

    logout.addEventListener("click", (e) => {
      signOut(auth)
        .then(() => {
          alert("Sign Out Successfully!!!");
          window.location = "../registration.html";
        })
        .catch((error) => {
          // An error happened.
        });
    });
    //
    //bla bla bla
    // ...
  } else {
    alert("You should login first!!!!");
    window.location = "../registration.html";
    // User is signed out
    // ...
    //bla bla bla
  }
});
