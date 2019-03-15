let express = require("express");
let app = express();
let path = require("path");
let router = require("./books");
app.use("/api", router);
app.set("views", path.join(__dirname + "/views"));
app.use(express.static("views"));

//Render View
app.get("/", function(req, res) {
  res.render("index");
});

app.listen(4000, () => {
  console.log("Server is started");
});
