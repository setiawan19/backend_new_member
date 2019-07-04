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

//ambil all data customer
app.get("/", (req, res) => {
  var sql = `SELECT customer.nama AS nama, customer.tempat_lahir AS lahir,
                    customer.tanggal_lahir AS birth, customer.alamat AS alamat,
                    customer.status_member AS member, penghasilan.status AS penghasilan,
                    status_rumah.status AS rumah, status_nikah.status AS nikah,
                    status_anak.status AS anak
                    FROM customer join penghasilan, status_anak, status_nikah, status_rumah
                    WHERE customer.id_kawin = status_nikah.id
                    AND customer.id_penghasilan = penghasilan.id
                    AND customer.id_anak = status_anak.id
                    AND customer.id_rumah = status_rumah.id`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
      //console.log(result);
    }
  });
});

//ambil data by status non member
app.get("/non_member", (req, res) => {
  var sql = `SELECT customer.nama AS nama, customer.tempat_lahir AS lahir,
                    customer.tanggal_lahir AS birth, customer.alamat AS alamat,
                    customer.status_member AS member, penghasilan.status AS penghasilan,
                    status_rumah.status AS rumah, status_nikah.status AS nikah,
                    status_anak.status AS anak
                    FROM customer join penghasilan, status_anak, status_nikah, status_rumah
                    WHERE customer.id_kawin = status_nikah.id
                    AND customer.id_penghasilan = penghasilan.id
                    AND customer.id_anak = status_anak.id
                    AND customer.id_rumah = status_rumah.id
                    AND customer.status_member = "tidak"`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
      //console.log(result);
    }
  });
});

//ambil data by status member
app.get("/member", (req, res) => {
  var sql = `SELECT customer.nama AS nama, customer.tempat_lahir AS lahir,
                    customer.tanggal_lahir AS birth, customer.alamat AS alamat,
                    customer.status_member AS member, penghasilan.status AS penghasilan,
                    status_rumah.status AS rumah, status_nikah.status AS nikah,
                    status_anak.status AS anak
                    FROM customer join penghasilan, status_anak, status_nikah, status_rumah
                    WHERE customer.id_kawin = status_nikah.id
                    AND customer.id_penghasilan = penghasilan.id
                    AND customer.id_anak = status_anak.id
                    AND customer.id_rumah = status_rumah.id
                    AND customer.status_member = "iya"`;
  // var sql = `SELECT * FROM customer`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
      //console.log(result);
    }
  });
});

//ambil data penghasilan
app.get("/penghasilan", (req, res) => {
  var sql = "SELECT * FROM penghasilan";
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});

//ambil data anak
app.get("/anak", (req, res) => {
  var sql = "SELECT * FROM status_anak";
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});
//ambil data nikah
app.get("/nikah", (req, res) => {
  var sql = "SELECT * FROM status_nikah";
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});
//ambil data rumah
app.get("/rumah", (req, res) => {
  var sql = "SELECT * FROM status_rumah";
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});

//add data calon member
app.post("/add", (req, res) => {
  var data = {
    id: req.body.id,
    nama: req.body.nama,
    id_kawin: req.body.id_kawin,
    id_penghasilan: req.body.id_penghasilan,
    id_rumah: req.body.id_rumah,
    id_anak: req.body.id_anak,
    tempat_lahir: req.body.tempat_lahir,
    tanggal_lahir: req.body.tanggal_lahir,
    alamat: req.body.alamat,
    status_member: req.body.status_member
  };

  var sql = `INSERT INTO customer SET ?`;

  db.query(sql, data, (err, result) => {
    if (err) {
      console.log("anda tidak dapat insert data member baru");
      throw err;
    } else {
      res.send({
        status: "Data Member Baru Berhasil di Tambahkan",
        id: req.body.id,
        nama: req.body.nama,
        id_kawin: req.body.id_kawin,
        id_penghasilan: req.body.id_penghasilan,
        id_rumah: req.body.id_rumah,
        id_anak: req.body.id_anak,
        tempat_lahir: req.body.tempat_lahir,
        tanggal_lahir: req.body.tanggal_lahir,
        alamat: req.body.alamat,
        status_member: req.body.status_member
      });
    }
  });
});

// aktivasi server
app.listen(8000, () => {
  console.log("Server aktif di port 8000!");
});
