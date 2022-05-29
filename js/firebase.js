// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-analytics.js";

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

import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";

const db = getFirestore();
console.log("From firebase js");

export { firebaseConfig, db };
