let i = 0;
let images = [];
images[0] = "images/1.JPG";
images[1] = "images/2.JPG";
images[2] = "images/3.JPG";
let images2 = [];
images2[0] = "images/pp1.JPG";
images2[1] = "images/pp2.JPG";
images2[2] = "images/pp3.JPG";
let time = 2000;

// Change Image
function changeImg() {
  document.slide.src = images[i];
  document.slide1.src = images2[i];

  // Check If Index Is Under Max
  if (i < images.length - 1) {
    // Add 1 to Index
    i++;
  } else {
    // Reset Back To O
    i = 0;
  }

  // Run function every x seconds
  setTimeout("changeImg()", time);
}

// Run function when page loads
window.onload = changeImg;
