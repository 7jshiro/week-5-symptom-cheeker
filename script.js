const styles = `
  body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 40px;
  }
  .container {
    max-width: 600px;
    margin: 0 auto;
    background-color: white;
    padding: 30px;
    border-radius: 10px;
  }
  h1 {
    margin-bottom: 10px;
  }
  .form {
    display: flex;
    gap: 10px;
    margin-top: 20px;
  }
  input {
    flex: 1;
    padding: 12px;
    font-size: 16px;
  }
  button {
    padding: 12px 20px;
    font-size: 16px;
    cursor: pointer;
  }
  ul {
    padding-left: 20px;
  }
  li {
    margin-bottom: 10px;
    position: relative;
    padding-right: 80px;
  }
  li button {
    padding: 5px 10px;
    position: absolute;
    right: 0;
    top: 0;
  }
`;

const styleTag = document.createElement("style");
styleTag.textContent = styles;
document.head.appendChild(styleTag);

import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const symptomInput = document.getElementById("symptomInput");
const symptomList = document.getElementById("symptomList");

if (!symptomInput || !symptomList) {
  throw new Error("Required symptom form elements were not found in the DOM.");
}

async function saveSymptom() {
  const symptom = symptomInput.value.trim();

  if (symptom === "") {
    alert("Please enter a symptom");
    return;
  }

  try {
    await addDoc(collection(db, "symptoms"), {
      symptom,
      createdAt: new Date().toISOString()
    });

    symptomInput.value = "";
    await getSymptoms();
  } catch (error) {
    console.error("Error saving symptom:", error);
  }
}
// Retriving and displaying data
async function getSymptoms() {
  try {
    const querySnapshot = await getDocs(collection(db, "symptoms"));
    const symptoms = querySnapshot.docs.map((document) => ({
      id: document.id,
      symptom: document.data().symptom
    }));

    symptomList.innerHTML = symptoms
      .map(
        (item) =>
          `<li>${item.symptom} <button type="button" onclick="deleteSymptom('${item.id}')">Delete</button></li>`
      )
      .join("");
  } catch (error) {
    console.error("Error getting symptoms:", error);
  }
}
// Function to delete a symptom by its ID
async function deleteSymptom(id) {
  try {
    await deleteDoc(doc(db, "symptoms", id));
    await getSymptoms();
  } catch (error) {
    console.error("Error deleting symptom:", error);
  }
}

window.saveSymptom = saveSymptom;
window.deleteSymptom = deleteSymptom;

// Load symptoms when the page loads
getSymptoms();



 

