let express = require("express");
let router = express.Router();
let fs = require("fs");
let xml2js = require("xml2js");
let parser = new xml2js.Parser();

// fetching all books
router.get("/books", function(req, res, next) {
  let xmlfile = __dirname + "/books.xml";
  fs.readFile(xmlfile, "utf-8", function(error, text) {
    if (error) {
      throw error;
    } else {
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
        let len = result.catalog.book.length;
        let exist = 0;
        for (let i = 0; i < len; i++) {
          if (
            getParams ===
            result.catalog.book[i].title[0].toLowerCase()
          ) {
            res.json(result.catalog.book[i]);
            exist = 1;
          }
        }
        if (exist == 0) {
          res.json({ error: true });
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
        let booksGenre = books.filter(
          e => e.genre[0].toLowerCase() == getParams
        );
        res.json(booksGenre); 
      });
    }
  });
});

module.exports = router;
