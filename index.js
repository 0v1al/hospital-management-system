require('dotenv').config({ path: "./config/.env" });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routeRegisterUser = require("./router/user/registerUser");
const routeLoginUser = require("./router/user/loginUser");
const routeLoginDoctor = require("./router/doctor/loginDoctor");
const routeLoginAdmin = require("./router/admin/loginAdmin");
const routeLoadUser = require("./router/user/loadUser");
const routeLoadAdmin = require("./router/admin/loadAdmin");
const routeDoctor = require("./router/doctor/loadDoctor");
const routeSpecialization = require("./router/admin/specialization");
const routeAdminDoctor = require("./router/admin/doctor");
const routeUser = require("./router/admin/user");
const routeMessage = require("./router/message/message");
const routeAppointment = require("./router/user/consultation");

const app = express();

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
.then(() => console.log('database connection established...'))
.catch(err => console.log(`${err} [database connection]`));

app.use(cors());
app.use(express.json());

app.use("/", routeRegisterUser);
app.use("/", routeLoginUser);
app.use("/", routeLoadUser);
app.use("/", routeLoginDoctor);
app.use("/", routeDoctor);
app.use("/", routeUser);
app.use("/", routeLoginAdmin);
app.use("/", routeLoadAdmin);
app.use("/", routeSpecialization);
app.use("/", routeAdminDoctor);
app.use("/", routeMessage);
app.use("/", routeAppointment);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running at localhost:${port}...`));