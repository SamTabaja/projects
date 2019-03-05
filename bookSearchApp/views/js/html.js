window.onload = function() {
  // search by book title
  getBookButton.onclick = () => {
    let url = "/api/books/" + title.value.toLowerCase();
    info.innerHTML = "";
    info.className = "mt-4 p-3";
    info.className += " border border-warning";
    divToggle(info);

    let xhttp4 = new XMLHttpRequest();
    xhttp4.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let data = JSON.parse(xhttp4.responseText);
        let dataLength = data.length;
        appendData(dataLength, data, info);
      }
    };
    xhttp4.open("GET", url, true);
    xhttp4.send();
  };

  // Search by genre button
  getGenreButton.onclick = () => {
    let url = "/api/genre/" + title.value.toLowerCase();
    info.innerHTML = "";
    info.className = "mt-4 p-3";
    info.className += " border border-primary";
    divToggle(info);
    let xhttp4 = new XMLHttpRequest();
    xhttp4.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let data = JSON.parse(xhttp4.responseText);
        let dataLength = data.length;
        appendData(dataLength, data, info);
      }
    };
    xhttp4.open("GET", url, true);
    xhttp4.send();
  };

  // get all books button
  getAllBooksButton.onclick = () => {
    let url = "/api/books";
    info.innerHTML = "";
    info.className = "mt-4 p-3";
    info.className += " border border-danger";
    divToggle(info);
    let xhttp4 = new XMLHttpRequest();
    xhttp4.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let data = JSON.parse(xhttp4.responseText);
        let len = data.catalog.book.length;
        let books = data.catalog.book;
        appendData(len, books, info);
      }
    };
    xhttp4.open("GET", url, true);
    xhttp4.send();
  };

  // helper functions --------->

  // handle toggle
  let divToggle = divName => {
    if (divName.style.display === "block") {
      divName.style.display = "none";
    } else {
      divName.style.display = "block";
    }
  };
  // append data to the HTML
  let appendData = (arr, data, parentDiv) => {
    let ul = document.createElement("ul");

    for (let i = 0; i < arr; i++) {
      let li = document.createElement("li");
      let title = document.createElement("h5");
      let author = document.createElement("h5");
      let genre = document.createElement("h5");
      let price = document.createElement("h5");
      let date = document.createElement("h5");
      let disc = document.createElement("h5");
      title.innerHTML += "Book title: " + data[i].title[0];
      author.innerHTML += "Author: " + data[i].author[0];
      genre.innerHTML += "Genre: " + data[i].genre[0];
      price.innerHTML += "Price: " + data[i].price[0];
      date.innerHTML +=
        "Publish date: " + data[i].publish_date[0];
      disc.innerHTML +=
        "Description: " + data[i].description[0];
      li.className += "mt-3";

      li.appendChild(title);
      li.appendChild(author);
      li.appendChild(genre);
      li.appendChild(price);
      li.appendChild(date);
      li.appendChild(disc);
      ul.appendChild(li);
      parentDiv.appendChild(ul);
    }
  };
};

// getBookButton.onclick = () => {
//   let url = "/api/books/" + title.value.toLowerCase();
//   divToggle(info);
//   // clear values
//   errorMsg.innerHTML = "";
//   author.innerHTML = "";
//   genre.innerHTML = "";
//   price.innerHTML = "";
//   date.innerHTML = "";
//   disc.innerHTML = "";
//   // appending bootstrap css
//   info.className += " border border-warning";
//   // getting data and append it to the HTML
//   let xhttp4 = new XMLHttpRequest();
//   xhttp4.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//       let data = JSON.parse(xhttp4.responseText);
//       if (data.error) {
//         errorMsg.innerHTML =
//           "The book you entered does not exist";
//         return;
//       }
//       if (title.value == "") {
//         errorMsg.innerHTML = "You have entered no value";
//         return;
//       } else {
//         author.innerHTML = "Author: " + data.author[0];
//         genre.innerHTML = "Genre: " + data.genre[0];
//         price.innerHTML = "Price: " + data.price[0];
//         date.innerHTML =
//           "Publish Data: " + data.publish_date[0];
//         disc.innerHTML =
//           "Description: " + data.description[0];
//       }
//     }
//   };
//   xhttp4.open("GET", url, true);
//   xhttp4.send();
// };
