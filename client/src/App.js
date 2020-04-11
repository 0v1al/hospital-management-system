import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";

import Navbar from "./components/Layout/Navbar/Navbar";
import Landing from "./components/Layout/Landing/Landing";
import Contact from "./components/Contact/Contact";
import LoginDoctor from './components/Doctor/LoginDoctor/LoginDoctor';
import LoginUser from "./components/User/LoginUser/LoginUser";
import LoginAdmin from "./components/Admin/LoginAdmin/LoginAdmin";
import RegisterUser from './components/User/RegisterUser/RegisterUser';
import AdminDashboard from './components/Admin/AdminDashboard/AdminDashboard';
import LeftNavbar from './components/Layout/LeftNavbar/LeftNavbar';
import LeftNavbarDoctor from "./components/Doctor/LeftNavbarDoctor/LeftNavbarDoctor";
import DoctorDashboard from "./components/Doctor/DoctorDashboard/DoctorDashboard";
import LeftNavbarUser from "./components/User/LeftNavbarUser/LeftNavbarUser";
import UserDashboard from "./components/User/UserDashboard/UserDashboard";
import DoctorSpecialization from "./components/Admin/DoctorSpecialization/DoctorSpecialization";
import AddDoctor from "./components/Admin/AddDoctor/AddDoctor";
import ManageDoctor from "./components/Admin/ManageDoctor/ManageDoctor";
import UpdateDoctor from "./components/Admin/UpdateDoctor/UpdateDoctor";
import Users from "./components/Admin/Users/Users";
import Patients from "./components/Admin/Patients/Patients";
import PatientDetails from "./components/Admin/PatientDetails/PatientDetails";

import  "./App.css";

function App() {
  return (
      <Router>
        <Route path="/" component={Navbar} />
        <Route path="/admin-*" component={LeftNavbar} />
        <Route path="/doctor-dashboard" component={LeftNavbarDoctor} />
        <Route path="/user-dashboard" component={LeftNavbarUser} />
        <Switch>
          <Route exact path="/" component={Landing}/>
          <Route exact path="/login-doctor" component={LoginDoctor}/>
          <Route exact path="/login-user" component={LoginUser}/>
          <Route exact path="/login-admin" component={LoginAdmin}/>
          <Route exact path="/register-user" component={RegisterUser}/>
          <Route exact path="/contact" component={Contact}/>
          <PrivateRoute exact path="/admin-dashboard" component={AdminDashboard} />
          <PrivateRoute exact path="/admin-doctor-specialization" component={DoctorSpecialization} />
          <PrivateRoute exact path="/admin-add-doctor" component={AddDoctor} />
          <PrivateRoute exact path="/admin-manage-doctor" component={ManageDoctor} />
          <PrivateRoute exact path="/admin-update-doctor/:doctorEmail" component={UpdateDoctor} />
          <PrivateRoute exact path="/admin-users" component={Users} />
          <PrivateRoute exact path="/admin-patients" component={Patients} />
          <PrivateRoute exact path="/admin-patient-details/:patientEmail" component={PatientDetails} />
          <PrivateRoute exact path="/doctor-dashboard" component={DoctorDashboard} />
          <PrivateRoute exact path="/user-dashboard" component={UserDashboard} />
        </Switch>
    </Router>
  );
}

export default App;
