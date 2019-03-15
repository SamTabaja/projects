window.onload = function() {
  // search by book title
  getBookButton.onclick = () => {
    let titleSearch = title.value.toLowerCase();
    if (titleSearch.trim().length == 0) {
      return;
    }
    let url = "/api/books/" + titleSearch;
    divToggleAndStyle(info, "warning");
    fetchData(url, "Book not Found");
  };

  // Search by genre button
  getGenreButton.onclick = () => {
    let genreSearch = title.value.toLowerCase();
    if (genreSearch.trim().length == 0) {
      return;
    }
    let url = "/api/genre/" + genreSearch;
    divToggleAndStyle(info, "primary");
    fetchData(url, "Genre not Found");
  };

  // get all books button
  getAllBooksButton.onclick = () => {
    let url = "/api/books";
    divToggleAndStyle(info, "danger");
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
  // handle toggle and style
  let divToggleAndStyle = (divName, style) => {
    divName.innerHTML = "";
    divName.className += `mt-4 p-3 border border-${style}`;
    if (divName.style.display === "block") {
      divName.style.display = "none";
    } else {
      divName.style.display = "block";
    }
  };
  // append data to the HTML
  let appendData = (dataLength, data, parentDiv) => {
    let ul = document.createElement("ul");
    for (let i = 0; i < dataLength; i++) {
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

  let fetchData = (url, errorMsg) => {
    let xhttp4 = new XMLHttpRequest();
    xhttp4.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let data = JSON.parse(xhttp4.responseText);
        let dataLength = data.length;
        if (dataLength == 0) {
          info.innerHTML = errorMsg.bold();
        } else {
          appendData(dataLength, data, info);
        }
      }
    };
    xhttp4.open("GET", url, true);
    xhttp4.send();
  };
};
