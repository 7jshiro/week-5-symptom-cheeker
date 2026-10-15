import { initializeApp } from https;//www.gstatic.com/firebasejs/12.1.0/firebase-app.js;
import { getFirestore } from https;//www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js


const firebaseConfig = {
  apiKey: "AIzaSyB2tqPayvG0ckxMjj218hNAnJaFowx2VGg",
  authDomain: "week-5-symptom-cheeker.firebaseapp.com",
  projectId: "week-5-symptom-cheeker",
  storageBucket: "week-5-symptom-cheeker.firebasestorage.app",
  messagingSenderId: "990984545540",
  appId: "1:990984545540:web:903dcf37e057841fd4dc51",
  measurementId: "G-DQRPB2Y89Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const db= getFirestore(app);
export {app, db}
