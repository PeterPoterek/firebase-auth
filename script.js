import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCVZZ-ouV2hdiE9vqhsBml1UIMEkmhjvkk",
  authDomain: "fir-practice-87e21.firebaseapp.com",
  projectId: "fir-practice-87e21",
  storageBucket: "fir-practice-87e21.appspot.com",
  messagingSenderId: "675483683705",
  appId: "1:675483683705:web:4e4022bdf348b5e1297da8",
  measurementId: "G-M6KW0W97E2",
};

let signUpSelected = true;

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

const registerButton = document.querySelector(".register");

const signInButton = document.querySelector("#sign-in-btn");
const signUpButton = document.querySelector("#sign-up-btn");

const nameInputContainer = document.querySelector("#name-input-container");

const title = document.querySelector("#title");

signInButton.addEventListener("click", () => {
  signInButton.classList.replace("not-selected", "selected");
  signUpButton.classList.replace("selected", "not-selected");

  signUpSelected = false;

  registerButton.textContent = "Sign In";

  nameInput.disabled = !nameInput.disabled;
  nameInputContainer.classList.toggle("hidden");

  title.textContent = "Login";
});

signUpButton.addEventListener("click", () => {
  signUpButton.classList.replace("not-selected", "selected");
  signInButton.classList.replace("selected", "not-selected");

  signUpSelected = true;

  registerButton.textContent = "Sign Up";

  nameInput.disabled = !nameInput.disabled;
  nameInputContainer.classList.toggle("hidden");

  title.textContent = "Register";
});

const form = document.querySelector("#form");

const handleButtonClick = async (e) => {
  e.preventDefault();

  try {
    if (signUpSelected) {
      const userCredential = await createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value);

      await addDoc(collection(db, "users"), {
        uid: userCredential.user.uid,
        name: nameInput.value,
        email: emailInput.value,
      });

      console.log("User registered successfully!");
    } else {
      const userCredential = await signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
      console.log(userCredential);
      // window.location.href = "home.html";
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

form.addEventListener("submit", handleButtonClick);
