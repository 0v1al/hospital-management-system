import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/Layout/Navbar/Navbar";
import Landing from "./components/Layout/Landing/Landing";
import LoginDoctor from './components/Doctor/LoginDoctor/LoginDoctor';
import LoginPatient from "./components/Patient/LoginPatient/LoginPatient";
import LoginAdmin from "./components/Admin/LoginAdmin/LoginAdmin";
import RegisterPatient from './components/Patient/RegisterPatient/RegisterPatient';
import AdminDashboard from './components/Admin/AdminDashboard/AdminDashboard';
import LeftNavbar from './components/Layout/LeftNavbar/LeftNavbar';
import LeftNavbarDoctor from "./components/Doctor/LeftNavbarDoctor/LeftNavbarDoctor";
import DoctorDashboard from "./components/Doctor/DoctorDashboard/DoctorDashboard";
import LeftNavbarPatient from "./components/Patient/LeftNavbarPatient/LeftNavbarPatient";
import PatientDashboard from "./components/Patient/PatientDashboard/PatientDashboard";

import  "./App.css";

function App() {
  return (
      <Router>
        <Route path="/" component={Navbar} />
        <Route path="/admin-dashboard" component={LeftNavbar} />
        <Route path="/doctor-dashboard" component={LeftNavbarDoctor} />
        <Route path="/patient-dashboard" component={LeftNavbarPatient} />
        <Switch>
          <Route exact path="/" component={Landing}/>
          <Route exact path="/login-doctor" component={LoginDoctor}/>
          <Route exact path="/login-patient" component={LoginPatient}/>
          <Route exact path="/login-admin" component={LoginAdmin}/>
          <Route exact path="/register-patient" component={RegisterPatient}/>
          <Route exact path="/admin-dashboard" component={AdminDashboard} />
          <Route exact path="/doctor-dashboard" component={DoctorDashboard} />
          <Route exact path="/patient-dashboard" component={PatientDashboard} />
        </Switch>
    </Router>
  );
}

export default App;
