window.onload = function() {
var hideShow = document.getElementById('viewImgsButton');
var myDiv1 = document.getElementById('firstDownContact');
var myDiv2 = document.getElementById('temp');
var clearbtn = document.getElementById("clearBtn");
var sendbtn = document.getElementById("sendBtn");var name = document.getElementById("contactName");
var phone = document.getElementById("contactPhone");
var message = document.getElementById("textMsg");
var email = document.getElementById("contactEmail");
var emailConfirm = document.getElementById("contactEmailConfirm");
var phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im


hideShow.addEventListener("click", function(){
        if (myDiv1.className === "hide") {
            myDiv1.className = "";
            myDiv2.className = "hide";
            hideShow.innerHTML = "BACK &larr;"
        }else{
            myDiv1.className = "hide";
            myDiv2.className = "";
            hideShow.innerHTML = "CONTACT ME"
        }
});


clearbtn.addEventListener("click", function() {
name.value = "";
phone.value = "";
email.value = "";
emailConfirm.value = "";
name.style.border = "none";
name.style.color = "black";
phone.style.border = "none";
phone.style.color = "black";
email.style.border = "none";
email.style.color = "black";
emailConfirm.style.border = "none";
emailConfirm.style.color = "black";
message.style.border = "none";
message.style.color = "black";

});


sendbtn.addEventListener("click", function() {
    if (!name.value) {  
    name.value = "Enter the name";
    name.style.border = "2px solid red";
    name.style.color = "red"
    name.focus();
    name.addEventListener("click", function() {
        name.placeholder = "Name";
        name.value = " ";
        name.style.border = "none";
        name.style.color = "black"
    })
    } 

    else if (!phone.value || !phone.value.match(phoneRegex)){
        phone.value = "Enter the phone number (Digits only) ten Digits or more";
        phone.style.color = "red"
        phone.style.border = "2px solid red";   
        phone.addEventListener("click", function() {
            phone.placeholder = "Enter the phone number (Digits only) ten Digits or more";
            phone.style.border = "none";
            phone.style.color = "black"
        })
    }
    else if (!email.value){
        email.placeholder = "Enter the email address";
        email.style.border = "2px solid red";
        email.addEventListener("click", function() {
            email.placeholder = "Email: example@example.com";
            email.style.border = "none";
        })
        
    }

    else if (!emailConfirm.value){
        emailConfirm.placeholder = "Please confirm your email address";
        emailConfirm.style.border = "2px solid red";
        emailConfirm.addEventListener("click", function() {
            emailConfirm.placeholder = "Confirm your Email";
            emailConfirm.style.border = "none";
        })
    }
    else if (email.value != emailConfirm.value){
        emailConfirm.value = "The email address is not matched";
        emailConfirm.style.border = "2px solid red";
        emailConfirm.addEventListener("click", function() {
            emailConfirm.value = "";
            emailConfirm.style.border = "none";
        })
    }

    else if (!message.value){
        message.placeholder = "Please enter your message"
        message.style.border = "2px solid red";
        message.addEventListener("click", function() {
            message.placeholder = "Enter Your Message";
            message.style.border = "none";
        })

    }
    else {
        message.style.color = "blue";
        message.value = "Email has been Sent";
    }
    

});

 }





