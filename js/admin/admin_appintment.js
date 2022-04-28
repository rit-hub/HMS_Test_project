// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAfGLH8AJsm5chCqQ-PJZq2IL7rDOMNc4",
  authDomain: "hms-demo-app.firebaseapp.com",
  projectId: "hms-demo-app",
  storageBucket: "hms-demo-app.appspot.com",
  messagingSenderId: "227706250306",
  appId: "1:227706250306:web:4ae7ba068b1128fdf6b9db",
  measurementId: "G-1SYRG25Z58",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

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
} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";

const db = getFirestore();

let Rank = document.getElementById("Rank");
let Name = document.getElementById("Name");

let Doctor = document.getElementById("Doctor");

let Date = document.getElementById("Date");

// adding docs

// getting data

let arr_data = [];

// self invoking function
// (function (parameters) {
//     //body of the function
// })(arguments);

(async function getData() {
  //   var ref = doc(db, "appointments", "1");
  const querySnapshot = await getDocs(collection(db, "appointments"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    let orderManager = function (someone) {
      return {
        rank: someone.Rank,
        doctor: someone.Doctor,
        name: someone.Name,
        date: someone.Date,
      };
    };
    console.log(doc.data());
    let data2 = orderManager(doc.data());
    arr_data.push(data2);
  });

  arr_data.forEach((emp, index) => {
    let row = document.createElement("tr");

    Object.values(emp).forEach((text) => {
      let cell = document.createElement("td");
      let textNode = document.createTextNode(text);
      cell.appendChild(textNode);
      row.appendChild(cell);
    });

    table.appendChild(row);

    if (index % 2 == 0) {
      $(document).ready(function () {
        $(row).css({
          "background-color": "#f3f3f3",
        });
      });
    }

    if (index == arr_data.length - 1) {
      $(document).ready(function () {
        $(row).css({
          "border-bottom": "2px solid #009879",
        });
      });
    }
  });

  myTable.appendChild(table);
})();
let myTable = document.querySelector("#table");

let table = document.getElementById("appintment-table");
