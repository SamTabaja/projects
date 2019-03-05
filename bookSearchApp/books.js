let express = require("express");
let router = express.Router();
let fs = require("fs");
let xml2js = require("xml2js");
let parser = new xml2js.Parser();

// fetching all books
router.get("/books", function(req, res, next) {
  let xmlfile = __dirname + "/books.xml";
  // read xml file
  fs.readFile(xmlfile, "utf-8", function(error, text) {
    if (error) {
      throw error;
    } else {
      // convert xml into json
      parser.parseString(text, function(err, result) {
        return res.json(result);
      });
    }
  });
});

// fetching books by title
router.route("/books/:title").get((req, res) => {
  let xmlfile = __dirname + "/books.xml";
  fs.readFile(xmlfile, "utf-8", function(error, text) {
    if (error) {
      throw error;
    } else {
      let getParams = req.params.title;
      parser.parseString(text, function(err, result) {
        if (err) throw err;
        let books = result.catalog.book;
        // filtering the books by received title
        let bookTitle = books.filter(book =>
          book.title[0].toLowerCase().includes(getParams)
        );
        res.json(bookTitle);
        if (bookTitle.length == 0) {
        }
      });
    }
  });
});

// fetching books by genre
router.route("/genre/:genre").get((req, res) => {
  let xmlfile = __dirname + "/books.xml";
  fs.readFile(xmlfile, "utf-8", function(error, text) {
    if (error) {
      throw error;
    } else {
      let getParams = req.params.genre;
      parser.parseString(text, function(err, result) {
        if (err) throw err;
        let books = result.catalog.book;
        // feltering the books by received genre
        let bookGenre = books.filter(book =>
          book.genre[0].toLowerCase().includes(getParams)
        );
        res.json(bookGenre);
      });
    }
  });
});

module.exports = router;
