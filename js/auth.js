import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
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

import { firebaseConfig } from "../js/firebase.js";

console.log("working");
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

let admin_email_data = [];
/* fetching data from firestore--------------------- */
// reg_email

/* validating --------------------*/

(async function getData() {
  const querySnapshot = await getDocs(collection(db, "Admins"));
  querySnapshot.forEach((doc) => {
    // console.log(doc.data().email);
    admin_email_data.push(doc.data().email);
  });
  console.log(admin_email_data);
})();

function validate_email(email) {
  var exp = /^[^@]+@\w+(\.\w+)+\w$/;
  if (exp.test(email) == true) {
    return true;
  } else {
    return false;
  }
}

function validate_password(password) {
  if (password < 6) {
    return false;
  } else return true;
}

function validate_field(field) {
  if (field == null) {
    return false;
  }
  if (field.length <= 0) {
    return false;
  } else return true;
}

// setup our register function
var signUP = document.getElementById("signUp");
signUP.addEventListener("click", (e) => {
  console.log("helooo");
  var fname = document.getElementById("fname").value;
  var email = document.getElementById("email").value;
  var type = document.getElementById("type").value;
  var password = document.getElementById("password").value;
  var specialization = document.getElementById("specialization").value;

  // validate input fields

  if (validate_email(email) == false || validate_password(password) == false) {
    alert("Enter Email and Password!!!");
    return;
    // dont run the code anymore
  }
  if (validate_field(fname) == false || validate_field(type) == false) {
    alert("Enter value in the fields!!!");
  }

  // register users

  console.log("working");
  createUserWithEmailAndPassword(auth, email, password)
    .then(function (userCredential) {
      var user = userCredential.user;
      // add data to the database
      if (type == "Doctor" || type == "DOCTOR") {
        async function AddDocument_AutoID() {
          var ref = collection(db, "Doctors");
          const docRef = await addDoc(ref, {
            name: fname,
            email: email,
            specialization: specialization,
          })
            .then(() => {
              alert("Doctor Created to Database!!!");
            })
            .catch((e) => {
              alert("Failed" + e);
            });
        }

        AddDocument_AutoID();
      }

      if (type == "Patient" || type == "PATIENT") {
        async function AddDocument_AutoID() {
          var ref = collection(db, "Patients");
          const docRef = await addDoc(ref, {
            name: fname,
            email: email,
          })
            .then(() => {
              alert("Patient Created to Database!!!");
            })
            .catch((e) => {
              alert("Failed" + e);
            });
        }

        AddDocument_AutoID();
      }

      if (type == "Admin123" || type == "ADMIN123") {
        async function AddDocument_AutoID() {
          var ref = collection(db, "Admins");
          const docRef = await addDoc(ref, {
            name: fname,
            email: email,
          })
            .then(() => {
              alert("Admin Created to Database!!!");
            })
            .catch((e) => {
              alert("Failed" + e);
            });
        }

        AddDocument_AutoID();
      }

      alert("User created");
    })
    .catch(function (error) {
      var err_code = error.code;
      var err_msg = error.message;
      alert(err_msg);
    });

  updateProfile(auth.currentUser, {
    displayName: fname,
  })
    .then(() => {
      console.log("Display name updated!!");
    })
    .catch((error) => {
      // An error occurred
      // ...
    });
});

// setup our login function

var signIN = document.getElementById("signIn");
signIN.addEventListener("click", (e) => {
  console.log("hello");
  var email = document.getElementById("login_email").value;
  var password = document.getElementById("login_password").value;
  console.log(email);

  if (validate_email(email) == false || validate_password(password) == false) {
    alert("Enter Email and Password!!!");
    return;
    // dont run the code anymore
  }

  if (admin_email_data.includes(email)) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log("Signing in");
        const user = userCredential.user;
        window.location = "admin/admin_dashboard.html";
        //  const dt = new Date();
        //   update(ref(database, 'users/' + user.uid),{
        //    last_login: dt,
        //  })

        alert("User loged in!");

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        alert(errorMessage);
      });
  } else {
    alert("You are not an admin !!!!");
  }
});

// login and redirect

// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/firebase.User
//     var uid = user.uid;
//     document.getElementsById("username").innerHTML = uid;
//     // console.log(uid);
//     window.location = "admin/admin_dashboard.html";
//     document.getElementsById("username").innerHTML = uid;
//     // console.log(document.getElementsById("username").innerHTML);
//     // console.log(uid);
//     //
//     //bla bla bla
//     // ...
//   } else {
//     // User is signed out
//     // ...
//     //bla bla bla
//   }
// });
