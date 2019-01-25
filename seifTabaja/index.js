let i = 0;
let images = [];
let time = 2000;
images[0] = "images/1.JPG";
images[1] = "images/2.JPG";
images[2] = "images/3.JPG";

// Change Image
function changeImg() {
  document.slide.src = images[i];

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
