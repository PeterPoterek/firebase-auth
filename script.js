import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
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
const db = getDatabase();
const auth = getAuth(app);
const dbref = ref(db);

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

const registerButton = document.querySelector(".register");

const signInButton = document.querySelector("#sign-in-btn");
const signUpButton = document.querySelector("#sign-up-btn");

const title = document.querySelector("#title");

signInButton.addEventListener("click", () => {
  signInButton.classList.replace("not-selected", "selected");
  signUpButton.classList.replace("selected", "not-selected");

  signUpSelected = false;

  registerButton.textContent = "Sign In";
  nameInput.classList.toggle("hidden");
  title.textContent = "Login";
});
signUpButton.addEventListener("click", () => {
  signUpButton.classList.replace("not-selected", "selected");
  signInButton.classList.replace("selected", "not-selected");

  signUpSelected = true;

  registerButton.textContent = "Sign Up";
  nameInput.classList.toggle("hidden");
  title.textContent = "Register";
});

const form = document.querySelector("#form");

const handleButtonClick = (e) => {
  e.preventDefault();

  if (signUpSelected) {
    createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
      .then((response) => {
        console.log(response);
        set(ref(db, "UsersAuthList/" + response.user.uid), { userName: nameInput.value });
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  } else {
    signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
      .then((response) => {
        get(child(dbref, "UsersAuthList/" + response.user.uid)).then((res) => {
          if (res.exists) {
            console.log(res);
          }
        });
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  }
};

form.addEventListener("submit", handleButtonClick);
