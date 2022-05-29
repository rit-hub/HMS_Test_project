import { db } from "../js/firebase.js";
import {
  getDocs,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";

// getting doctors data data

let patient_email_data = [];
/* fetching data from firestore--------------------- */
// reg_email

/* validating --------------------*/

(async function getData() {
  const querySnapshot = await getDocs(collection(db, "Patients"));
  querySnapshot.forEach((doc) => {
    // console.log(doc.data().email);
    patient_email_data.push(doc.data().email);
  });
  console.log(patient_email_data);
})();

(async function getData() {
  //   var ref = doc(db, "appointments", "1");
  const querySnapshot = await getDocs(collection(db, "Doctors"));

  querySnapshot.forEach((doc) => {
    console.log(doc.data().name);
    var doctors = document.getElementById("doctors_list");
    var myOption = document.createElement("option");
    myOption.text = doc.data().name;
    myOption.value = doc.data().name;
    doctors.appendChild(myOption);
  });
})();

// function validate_reg_email(email_test) {
//   setTimeout(() => {
//     console.log(patient_email_data);

//     // return patient_email_data.includes(email_test);
//     return patient_email_data.includes(ema il_test);
//   }, 5000);
// }

// setTimeout(() => {
//   console.log(validate_reg_email("infofwdw.rfwfwitamcharan@gmail.com"));
// }, 10000);

function validate_reg_email(email_test) {
  return patient_email_data.includes(email_test);
}

function validate_email(email) {
  var exp = /^[^@]+@\w+(\.\w+)+\w$/;
  if (exp.test(email) == true) {
    return true;
  } else {
    return false;
  }
}
function validate_field(field) {
  if (field == null) {
    return false;
  }
  if (field.length <= 0) {
    return false;
  } else return true;
}

var submit = document.getElementById("submit");
submit.addEventListener("click", (e) => {
  var name = document.getElementById("fname").value;
  var number = document.getElementById("number").value;
  var email = document.getElementById("email").value;
  var doctors = document.getElementById("doctors_list").value;
  var date = document.getElementById("date").value;

  if (validate_email(email) == false) {
    alert("Enter Correct Email!!!");
    return;
    // dont run the code anymore
  }
  if (validate_field(fname) == false) {
    alert("Enter value in the fields!!!");
  }
  if (!validate_reg_email(email)) {
    alert("First register yourself !!");
    window.location = "/pages/registration.html";
  } else {
    async function AddDocument_AutoID() {
      var ref = collection(db, "Appointments");
      const docRef = await addDoc(ref, {
        name: name,
        email: email,
        number: number,
        doctor: doctors,
        date: date,
      })
        .then(() => {
          alert("Appointment booked Successfully for " + date);
        })
        .catch((e) => {
          alert("Failed" + e);
        });
    }

    AddDocument_AutoID();
  }
  // console.log(name);
  // console.log(email);

  // console.log(number);

  // console.log(doctors);

  // console.log(date);
});
