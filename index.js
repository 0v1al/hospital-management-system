require('dotenv').config({ path: "./config/.env" });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routeRegisterPatient = require("./router/patient/registerPatient");
const routeLoginPatient = require("./router/patient/loginPatient");
const routeLoginDoctor = require("./router/doctor/loginDoctor");
const routeLoginAdmin = require("./router/admin/loginAdmin");
const routeLoadPatient = require("./router/patient/loadPatient");
const routeLoadAdmin = require("./router/admin/loadAdmin");
const routeDoctor = require("./router/doctor/loadDoctor");

const app = express();

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Database connection established...'))
.catch(err => console.log(`${err} [database connection]`));

app.use(cors());
app.use(express.json());

app.use("/", routeRegisterPatient);
app.use("/", routeLoginPatient);
app.use("/", routeLoadPatient);
app.use("/", routeLoginDoctor);
app.use("/", routeDoctor);
app.use("/", routeLoginAdmin);
app.use("/", routeLoadAdmin);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running at localhost:${port}...`));