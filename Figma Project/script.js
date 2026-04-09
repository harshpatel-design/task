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



    const registerIdBtn = document.getElementById("register-id-btn");
    const verifyRegisterBtn = document.getElementById("verify-register-btn");
    const kycRegisterBtn = document.getElementById("kycRegisterBtn");
    const kycDoneBtn = document.getElementById("kycDone");



    MODEL.classList.add("d-none");
    wp.classList.remove("d-none");
    loginBox.classList.add("d-none");
    signUpBox.classList.add("d-none");
    signFaild.classList.add("d-none");
    signAlert.classList.add("d-none");
    sign3.classList.add("d-none");
    sign2.classList.add("d-none");
    sign1.classList.add("d-none");

    
    registerGo.addEventListener("click",(e) =>{
        e.preventDefault()
        MODEL.classList.remove("d-none");
        signUpBox.classList.remove("d-none");
        sign1.classList.remove("d-none");
        wp.classList.add("d-none")
        headder.classList.add("d-none");
    })

    registerIdBtn.addEventListener("click",(e) =>{
        e.preventDefault();
        sign1.classList.add("d-none");
        sign2.classList.remove("d-none");
    })
    verifyRegisterBtn.addEventListener("click",(e) =>{
        e.preventDefault();
        sign2.classList.add("d-none");
        sign3.classList.remove("d-none");
    })
    kycRegisterBtn.addEventListener("click",(e) =>{
        e.preventDefault();
        sign3.classList.add("d-none");
        signAlert.classList.remove("d-none");
       
    })
    kycRegisterBtn.addEventListener("click",(e) =>{
        e.preventDefault();
        sign3.classList.add("d-none");
        signAlert.classList.add("d-none");
        MODEL.classList.add("d-none");
        headder.classList.remove("d-none");
        wp.classList.remove("d-none");
    })

})

    