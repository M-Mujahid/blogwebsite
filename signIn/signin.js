import { auth, signInWithEmailAndPassword, onAuthStateChanged } from "../firebaseConfig.js";


// ---------Login Create Variables----------

const userLoginEmail = document.getElementById("loginEmail");
// console.log(userLoginEmail);
const userLoginPassword = document.getElementById("loginPassword");
// console.log(userLoginPassword);
const userLoginBtn = document.querySelector(".loginBtn");
// console.log(userLoginBtn);
const loginShowPassword = document.querySelector("#showPassword")
// console.log(loginShowPassword);



onAuthStateChanged(auth, (user) => {
  if (user) {
    // console.log(user.email);
    const uid = user.uid;
    // console.log(uid);
    window.location.href = `../UserDashboard/dashboard.html`

  } else {
    console.log("User is Signout");
  }
});


// ---------Signin Function----------

async function loginHandler(userID) {

  try {
    const response = await
      signInWithEmailAndPassword(auth, userLoginEmail.value, userLoginPassword.value)

    // console.log(response.user.uid);

  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);

    if (errorCode) {
      if (errorCode == "auth/invalid-email") {
        Swal.fire({
          icon: 'error',
          title: 'your email is not valid kindly provide some valid email'
        })
    
      } else if (errorCode == "auth/missing-password") {
        Swal.fire({
          icon: 'error',
          title: 'your password missing kindly provide password'
        })
      } else if (errorCode == "auth/wrong-password") {
        Swal.fire({
          icon: 'error',
          title: 'You entered worng password'
        })
      } else if (errorCode == "auth/user-not-found") {
        Swal.fire({
          icon: 'error',
          title: 'This user is not found kindly signup'
        })
        let swalOk = document.querySelector('.swal2-confirm')
        swalOk.addEventListener("click", () => {
          window.location.href = "../signUp/signup.html"
        })
      }
    }
  }
}

// ---------Show Password Function----------

function showPassword() {

  if (userLoginPassword.type === "password") {
    userLoginPassword.type = "text"

  } else {
    userLoginPassword.type = "password"

  }

}


// ---------Signin addEventListener----------

userLoginBtn.addEventListener('click', loginHandler);
loginShowPassword.addEventListener('click', showPassword);