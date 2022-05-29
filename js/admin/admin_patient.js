// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { firebaseConfig } from "../firebase.js";

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

// adding docs

// getting data

let arr_data = [];

// self invoking function
// (function (parameters) {
//     //body of the function
// })(arguments);

(async function getData() {
  //   var ref = doc(db, "appointments", "1");
  const querySnapshot = await getDocs(collection(db, "Patients"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    let orderManager = function (someone) {
      return {
        name: someone.name,
        email: someone.email,
        
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

let table = document.getElementById("doctors-table");
