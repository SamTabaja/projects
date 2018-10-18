window.onload = function() {
    var hideShow = document.getElementById('viewImgsButton');
var myDiv1 = document.getElementById('firstDownContact');
var myDiv2 = document.getElementById('temp');

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



var btn = document.getElementById("clearBtn");
var name = document.getElementById("contactName");
var phone = document.getElementById("contactPhone");
var email = document.getElementById("contactEmail");
var regNum = new RegExp ('/^\d+$/');

btn.addEventListener("click", function() {
name.value = "";
phone.value = "";
email.value = "";
});


 }
