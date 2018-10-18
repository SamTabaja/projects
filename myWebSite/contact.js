window.onload = function() {
    /* Add your logic here */
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

