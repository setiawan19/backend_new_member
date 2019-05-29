var mysql = require("mysql");
var express = require("express");
var cors = require("cors");
const bodyparser = require("body-parser");

var app = express();
app.use(bodyparser.json());
app.use(cors());

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "new_account"
});
db.connect(() => {
  console.log("Terhubung ke MySQL Member Golf!");
  // db.end()
});
// ===================== INPUT API =========================
//ambil all data admin
app.get("/customer", (req, res) => {
  var ambildata = `SELECT * FROM customer`;
  db.query(ambildata, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
      //console.log(result);
    }
  });
});
// aktivasi server
app.listen(3000, () => {
  console.log("Server aktif di port 3000!");
});
