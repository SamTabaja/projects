## Book Search APP

### What is used

- _JavaScript_, _Express_, _File System_ and _xml2js_ were used for the **Back End**
- _Postman_ were used for testing the **End Points** routes
- _ES6_, _Bootstrap_, and _HTML_ for the **Front End**

### Installation

- You will need to have `NodeJS` installed from [nodejs.org](https://nodejs.org/en/download/).
- When `NodeJS` installed, open your **Terminal** or from the intergrated **Terminal** if you are using _VSCode_
- Navigate to the directory where the App is located > I.E Desktop\someFolder\bookSearchApp
- Type in `npm install` to install all the required dependencies from the _package.json_ file

### How to Run

- From the same directory, type in `npm start`> Notice that a message _Server is Started_ will be logged in the **Terminal**
- Open your browser (preferably Chrome or FireFox)
- At the **URL** bar, type in `http://localhost:4000`
- And here we go !!!!

### End Points

- There are three _Express Routes_ as follows:
  1- The first is to route to `api/books` which fetch all the books
  2- the second is to route to `api/books/:title` which fetches the books based on a book title value received from the user _title_
  3- the third is to route to `api/genre/:genre` which fetches the books based on a genre value received from the user _genre_

### How to search

- All the searching information are listed on the _Front Page_
