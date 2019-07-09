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
  password: "",
  database: "new_account"
});
db.connect(() => {
  console.log("Terhubung ke MySQL Member Golf!");
  // db.end()
});
// ===================== INPUT API =========================

// get profile admin
app.get("/profileadmin", (req, res) => {
  var sql = "SELECT * FROM admin_user";
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});

// login admin
app.post("/loginadmin", (req, res) => {
  var username = req.body.inputUsername;
  var password = req.body.inputPassword;

  var sql = `SELECT * FROM admin_user`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    } else {
      for (var i = 0; i < result.length; i++) {
        if (
          username === result[i].username &&
          password === result[i].password
        ) {
          console.log("login berhasil");
          var userId = result[i].id;
          // console.log(userId);
          res.send(userId.toString());
          break;
        } else if (i === result.length - 1) {
          console.log("login gagal");
        }
      }
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
        // id: req.body.id,
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

//ambil all data customer
app.get("/", (req, res) => {
  var sql = `SELECT customer.nama AS nama, customer.tempat_lahir AS lahir,
                    customer.tanggal_lahir AS birth, customer.alamat AS alamat,
                    customer.status_member AS member, penghasilan.nama AS penghasilan,
                    status_rumah.nama AS rumah, status_nikah.nama AS nikah,
                    status_anak.nama AS anak
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
                    customer.status_member AS member, penghasilan.nama AS penghasilan,
                    status_rumah.nama AS rumah, status_nikah.nama AS nikah,
                    status_anak.nama AS anak
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
                    customer.status_member AS member, penghasilan.nama AS penghasilan,
                    status_rumah.nama AS rumah, status_nikah.nama AS nikah,
                    status_anak.nama AS anak
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

//============ Data Penghasilan =========
//#region DATA PENGHASILAN
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

//ambil data penghasilan by id
app.get("/penghasilan/:id", (req, res) => {
  var sql = `SELECT * FROM penghasilan WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});

//ambil point penghasilan by id
app.get("/point_penghasilan/:id", (req, res) => {
  var sql = `SELECT point FROM penghasilan WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});

// add penghasilan & point
app.post("/penghasilan", (req, res) => {
  console.log(req.body);
  var data = {
    id: null,
    nama: req.body.nama,
    point: req.body.point
  };
  var sql = `INSERT INTO penghasilan SET ?`;
  db.query(sql, data, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send({
        status: "Data Penghasilan Sukses di tambahkan",
        // id: id.req.body.id,
        nama: req.body.nama,
        point: req.body.point
      });
    }
  });
});

//edit penghasilan by id
app.post("/penghasilan/edit/:id", (req, res) => {
  console.log(req.body);
  var data = {
    id: req.body.id,
    nama: req.body.nama,
    point: req.body.point
  };
  var sql = `UPDATE penghasilan set ? WHERE id = ${req.params.id}`;
  db.query(sql, data, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send({
        status: `Data Berhasil di Update`,
        id: req.body.id,
        nama: req.body.nama,
        point: req.body.point
      });
    }
  });
});

//delete penghasilan by id
app.delete("/penghasilan/:id", (req, res) => {
  var sql = "DELETE FROM penghasilan WHERE id = ?";
  db.query(sql, req.params.id, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send({
        status: `Data Penghasilan Berhasil dihapus`
      });
    }
  });
});
//#endregion
//============ ^^^ ======================

//============ Data Anak ================
//#region DATA ANAK
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
//ambil data anak by id
app.get("/anak/:id", (req, res) => {
  var sql = `SELECT * FROM status_anak WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});

//ambil point anak by id
app.get("/point_anak/:id", (req, res) => {
  var sql = `SELECT point FROM status_anak WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});

// add anak & point
app.post("/anak", (req, res) => {
  console.log(req.body);
  var data = {
    id: null,
    nama: req.body.nama,
    point: req.body.point
  };
  var sql = `INSERT INTO status_anak SET ?`;
  db.query(sql, data, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send({
        status: "Data Anak Sukses di tambahkan",
        // id: id.req.body.id,
        nama: req.body.nama,
        point: req.body.point
      });
    }
  });
});

//edit anak by id
app.post("/anak/edit/:id", (req, res) => {
  console.log(req.body);
  var data = {
    id: req.body.id,
    nama: req.body.nama,
    point: req.body.point
  };
  var sql = `UPDATE status_anak set ? WHERE id = ${req.params.id}`;
  db.query(sql, data, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send({
        status: `Data Berhasil di Update`,
        id: req.body.id,
        nama: req.body.nama,
        point: req.body.point
      });
    }
  });
});

//delete anak by id
app.delete("/anak/:id", (req, res) => {
  var sql = "DELETE FROM status_anak WHERE id = ?";
  db.query(sql, req.params.id, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send({
        status: `Data Status Anak Berhasil dihapus`
      });
    }
  });
});
//#endregion
//============ ^^^ ======================

//============ Data Anak ================
//#region DATA NIKAH
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
//ambil data nikah by id
app.get("/nikah/:id", (req, res) => {
  var sql = `SELECT * FROM status_nikah WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});

//ambil point nikah by id
app.get("/nikah/:id", (req, res) => {
  var sql = `SELECT point FROM status_nikah WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});

// add nikah & point
app.post("/nikah", (req, res) => {
  console.log(req.body);
  var data = {
    id: null,
    nama: req.body.nama,
    point: req.body.point
  };
  var sql = `INSERT INTO status_nikah SET ?`;
  db.query(sql, data, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send({
        status: "Data Nikah Sukses di tambahkan",
        // id: id.req.body.id,
        nama: req.body.nama,
        point: req.body.point
      });
    }
  });
});

//edit nikah by id
app.post("/nikah/edit/:id", (req, res) => {
  console.log(req.body);
  var data = {
    id: req.body.id,
    nama: req.body.nama,
    point: req.body.point
  };
  var sql = `UPDATE status_nikah set ? WHERE id = ${req.params.id}`;
  db.query(sql, data, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send({
        status: `Data Berhasil di Update`,
        id: req.body.id,
        nama: req.body.nama,
        point: req.body.point
      });
    }
  });
});

//delete nikah by id
app.delete("/nikah/:id", (req, res) => {
  var sql = "DELETE FROM status_nikah WHERE id = ?";
  db.query(sql, req.params.id, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send({
        status: `Data Status Nikah Berhasil dihapus`
      });
    }
  });
});
//#endregion
//============ ^^^ ======================

//============ Data Anak ================
//#region DATA RUMAH
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

//ambil data rumah by id
app.get("/rumah/:id", (req, res) => {
  var sql = `SELECT * FROM status_rumah WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});

//ambil point rumah by id
app.get("/point_rumah/:id", (req, res) => {
  var sql = `SELECT point FROM status_rumah WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});

// add rumah & point
app.post("/rumah", (req, res) => {
  console.log(req.body);
  var data = {
    id: null,
    nama: req.body.nama,
    point: req.body.point
  };
  var sql = `INSERT INTO status_rumah SET ?`;
  db.query(sql, data, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send({
        status: "Data Rumah Sukses di tambahkan",
        // id: id.req.body.id,
        nama: req.body.nama,
        point: req.body.point
      });
    }
  });
});

//edit rumah by id
app.post("/rumah/edit/:id", (req, res) => {
  console.log(req.body);
  var data = {
    id: req.body.id,
    nama: req.body.nama,
    point: req.body.point
  };
  var sql = `UPDATE status_rumah set ? WHERE id = ${req.params.id}`;
  db.query(sql, data, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send({
        status: `Data Berhasil di Update`,
        id: req.body.id,
        nama: req.body.nama,
        point: req.body.point
      });
    }
  });
});

//delete rumah by id
app.delete("/rumah/:id", (req, res) => {
  var sql = "DELETE FROM status_rumah WHERE id = ?";
  db.query(sql, req.params.id, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send({
        status: `Data Status Rumah Berhasil dihapus`
      });
    }
  });
});

//#endregion
//============ ^^^ ======================

// aktivasi server
app.listen(8000, () => {
  console.log("Server aktif di port 8000!");
});
