document.addEventListener("DOMContentLoaded", () => {
  const loginGo = document.getElementById("login-go");
  const registerGo = document.getElementById("register-go");
  const MODEL = document.getElementById("MODEL");
  const wp = document.getElementById("wp");
  const headder = document.getElementById("Headder");
  const loginBox = document.getElementById("login-box");
  const signUpBox = document.getElementById("signUp-box");
  const signFaild = document.getElementById("sign-faild");
  const signAlert = document.getElementById("sign-alert");
  const sign3 = document.getElementById("sign3");
  const sign2 = document.getElementById("sign2");
  const sign1 = document.getElementById("sign1");
  const login1 = document.getElementById("login-1");
  const errorPassword = document.getElementById("error-password");

  const verifyRegisterBtn = document.getElementById("verify-register-btn");
  const kycRegisterBtn = document.getElementById("kycRegisterBtn");
  const kycDone = document.getElementById("kycDone");
  const faildlater = document.querySelectorAll(".faildlater");

  const alertForm = document.getElementById("alertForm");
  const loginForm = document.getElementById("loginForm");
  const resetForm = document.getElementById("resetForm");
  const form1 = document.getElementById("form1");
  const sign3Address = document.getElementById("sign3Address");
  const login2 = document.getElementById("login2");

  let currentStep = getCurrentStep();

  MODEL.classList.add("d-none");
  wp.classList.remove("d-none");
  loginBox.classList.add("d-none");
  signUpBox.classList.add("d-none");
  signFaild.classList.add("d-none");
  signAlert.classList.add("d-none");
  sign3.classList.add("d-none");
  sign2.classList.add("d-none");
  sign1.classList.add("d-none");
  errorPassword.classList.add("d-none");

  class User {
    constructor(
      firstName,
      lastName,
      email,
      userName,
      phoneNumber,
      date,
      password,
      confirmPassword,
      verifyAccount = false,
      updateKyc = false,
      address = null,
    ) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.userName = userName;
      this.phoneNumber = phoneNumber;
      this.date = date;
      this.password = password;
      this.confirmPassword = confirmPassword;
      this.verifyAccount = verifyAccount;
      this.address = address;
      this.updateKyc = updateKyc;
      this.id = this.generateId();
    }

    generateId() {
      return (
        `${this.email}` + Date.now() + "-" + Math.floor(Math.random() * 1000)
      );
    }
  }

  faildlater.forEach((btn) => {
    btn.addEventListener("click", () => {
      let currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (currentUser) {
        if (!currentUser.verifyAccount) {
          currentStep = "kyc";
        } else if (!currentUser.address) {
          currentStep = "address";
        } else if (!currentUser.updateKyc) {
          currentStep = "updateKyc";
        } else {
          currentStep = "done";
        }
      }
      closeModal();
    });
  });

  function openModal() {
    MODEL.classList.remove("d-none");
    signUpBox.classList.remove("d-none");
    wp.classList.add("d-none");
    headder.classList.add("d-none");
  }

  function closeModal() {
    MODEL.classList.add("d-none");
    signUpBox.classList.add("d-none");
    wp.classList.remove("d-none");
    headder.classList.remove("d-none");
  }

  function getCurrentStep() {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) return "register";
    if (!user.verifyAccount) return "kyc";
    if (!user.address) return "address";
    if (!user.updateKyc) return "updateKyc";
    return "done";
  }

  function hideAllSteps() {
    sign1.classList.add("d-none");
    sign2.classList.add("d-none");
    sign3.classList.add("d-none");
    signFaild.classList.add("d-none");
    signAlert.classList.add("d-none");
  }

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (currentUser) {
    if (!currentUser.verifyAccount) {
      currentStep = "kyc";
    } else if (!currentUser.address) {
      currentStep = "address";
    } else if (!currentUser.updateKyc) {
      currentStep = "updateKyc";
    } else {
      currentStep = "done";
    }
  }

  kycDone.addEventListener("click", (e) => {
    closeModal();
    hideAllSteps();
  });

  form1.addEventListener("submit", (e) => {
    e.preventDefault();

    const firstName = document.getElementById("form1FName").value.trim();
    const lastName = document.getElementById("form1LName").value.trim();
    const email = document.getElementById("form1emailName").value.trim();
    const userName = document.getElementById("form1useName").value.trim();
    const phoneNumber = document
      .getElementById("form1phoneNumber")
      .value.trim();
    const date = document.getElementById("form1date").value;
    const password = document.getElementById("form1Password").value;
    const confirmPassword = document.getElementById(
      "form1confirmPassword",
    ).value;
    const terms1 = document.getElementById("terms1");
    const terms2 = document.getElementById("terms2");

    if (!terms1.checked || !terms2.checked) {
      alert("Please accept Terms & Conditions");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.some((user) => user.email === email);

    if (exists) {
      alert("Email Already Register");
      return;
    }

    if (
      !firstName ||
      !lastName ||
      !email ||
      !userName ||
      !phoneNumber ||
      !date ||
      !password ||
      !confirmPassword
    ) {
      alert("All fields are required ");
      return;
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
      alert("Phone number must be 10 digits");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      alert("Invalid email");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password not match");
      return;
    }

    const user = new User(
      firstName,
      lastName,
      email,
      userName,
      phoneNumber,
      date,
      password,
      confirmPassword,
    );

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    localStorage.setItem("currentUser", JSON.stringify(user));
    document.getElementById("yourId").innerText = "Your ID: " + user.id;

    alert("User created with ID: " + user.id);

    sign1.classList.add("d-none");
    sign2.classList.remove("d-none");
  });

  verifyRegisterBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const clubId = document.getElementById("clubId").value.trim();
    const socialClubId = document.getElementById("socialClubId").value.trim();

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (!clubId || !socialClubId) {
      alert("All fields are required ");
      return;
    }

    if (!currentUser) {
      alert("User not found");
      return;
    }
    if (clubId !== currentUser.id) {
      alert("Club ID not match");
      sign2.classList.add("d-none");
      signFaild.classList.remove("d-none");
      return;
    }
    if (
      !socialClubId.toLowerCase().includes(currentUser.userName.toLowerCase())
    ) {
      alert("Social club does not match your userName");
      sign2.classList.add("d-none");
      signFaild.classList.remove("d-none");
      return;
    }

    users = users.map((user) => {
      if (user.id === currentUser.id) {
        return { ...user, verifyAccount: true };
      }
      return user;
    });

    alert("Verification successful");

    currentUser.verifyAccount = true;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    localStorage.setItem("users", JSON.stringify(users));

    sign2.classList.add("d-none");
    sign3.classList.remove("d-none");
  });

  sign3Address.addEventListener("submit", (e) => {
    e.preventDefault();

    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const add1 = document.getElementById("Add1").value.trim();
    const add2 = document.getElementById("Add2").value.trim();
    const addressZipcode = document
      .getElementById("addressZipcode")
      .value.trim();
    const addressstate = document.getElementById("addressstate").value.trim();
    const addressCity = document.getElementById("addressCity").value.trim();

    if (!currentUser) {
      alert("User not found");
      return;
    }

    if (!add1 || !add2 || !addressstate || !addressZipcode || !addressCity) {
      alert("All fields are required");
      return;
    }

    const addObj = {
      add1,
      add2,
      state: addressstate,
      city: addressCity,
      zipcode: addressZipcode,
    };
    currentUser.address = addObj;

    const index = users.findIndex((user) => user.id === currentUser.id);
    if (index !== -1) {
      users[index].address = addObj;
    }

    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    localStorage.setItem("users", JSON.stringify(users));

    sign3.classList.add("d-none");
    signAlert.classList.remove("d-none");
  });

  alertForm.addEventListener("submit", (e) => {
    e.preventDefault();
    closeModal();
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let users = JSON.parse(localStorage.getItem("users")) || [];

    registerGo.innerText = currentUser.userName;

    currentUser.updateKyc = true;
    const index = users.findIndex((user) => user.id === currentUser.id);
    if (index !== -1) {
      users[index].updateKyc = true;
    }

    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    localStorage.setItem("users", JSON.stringify(users));
  });

  registerGo.addEventListener("click", (e) => {
    e.preventDefault();
    const step = getCurrentStep();

    if (step === "done") {
      alert("You have alredy Register");
      return;
    }

    openModal();
    hideAllSteps();
    if (step === "register") {
      sign1.classList.remove("d-none");
    } else if (step === "kyc") {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      document.getElementById("yourId").innerText =
        "Your ID: " + currentUser.id;

      if (signFaild.classList.contains("d-none")) {
        sign2.classList.remove("d-none");
      } else {
        signFaild.classList.remove("d-none");
      }
      sign1.classList.add("d-none");
    } else if (step === "address") {
      sign2.classList.add("d-none");
      sign3.classList.remove("d-none");
    } else if (step === "updateKyc") {
      signAlert.classList.remove("d-none");
      sign3.classList.add("d-none");
    } else {
      alert("All steps completed");
      step = "done";
      closeModal();
    }
  });

  loginGo.addEventListener("click", (e) => {
    e.preventDefault();
    login2.classList.add("d-none");
    MODEL.classList.remove("d-none");
    loginBox.classList.remove("d-none");
    wp.classList.add("d-none");
    headder.classList.add("d-none");
    login1.classList.remove("d-none");
  });

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const loginPassword = document.getElementById("loginPassword").value;
    const loginEmail = document.getElementById("LoginEmail").value;

    if (!loginPassword || !loginEmail.trim()) {
      alert("Enter valid Email/Username or Password");
      return;
    }

    const user = users.find((u) => {
      return (
        (u.email === loginEmail.trim() || u.userName === loginEmail.trim()) &&
        u.password === loginPassword
      );
    });

    if (!user) {
      alert("Invalid Email-Username or Password");
      return;
    }

    alert("Login successful");

    localStorage.setItem("currentUser", JSON.stringify(user));
    registerGo.innerText = user.firstName;

    document.getElementById("loginPassword").value = "";
    document.getElementById("LoginEmail").value = "";

    closeModal();
    loginGo.innerText = "Logout";
  });

  const registerLink = document.getElementById("register-link");

  registerLink.addEventListener("click", (e) => {
    e.preventDefault();
    loginBox.classList.add("d-none");
    openModal();
    hideAllSteps();
    sign1.classList.remove("d-none");
  });

  const forget = document.querySelector(".forgetPassword");

  forget.addEventListener("click", (e) => {
    e.preventDefault();
    loginBox.classList.remove("d-none");
    signUpBox.classList.add("d-none");
    login2.classList.remove("d-none");
    login1.classList.add("d-none");
  });

  resetForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const p1 = document.getElementById("resetPassword").value.trim();
    const p2 = document.getElementById("resetPassword2").value.trim();
    const email = document.getElementById("resetEmail").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentUser = JSON.parse(localStorage.getItem("currentUser")) || [];

    if (!p1 || !p2 || !email) {
      alert("All fields are required");
      return;
    }

    if (p1 !== p2) {
      alert("Passwords do not match");
      return;
    }

    const user = users.find((u) => {
      return u.email === email.trim();
    });

    if (!user) {
      alert("email not register");
      return;
    }

    user.password = p1;
    user.confirmPassword = p2;
    currentUser.password = p1;
    currentUser.confirmPassword = p2;

    alert("password change successfully")
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(user));

     closeModal();
    console.log(p1, p2, email);
  });
});
