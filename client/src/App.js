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
import ReadMessages from "./components/Admin/Messages/ReadMessages";
import UnreadMessages from "./components/Admin/Messages/UnreadMessages";
import UpdateMessage from "./components/Admin/Messages/UpdateMessage";
import UserSessionLogs from "./components/UserSessionLogs/UserSessionLogs";
import DoctorSessionLogs from "./components/DoctorSessionLogs/DoctorSessionLogs";
import Reports from "./components/Admin/Reports/Reports";
import SearchPatient from "./components/Admin/SearchPatient/SearchPatient";
import AppointmentConsultation from "./components/User/AppointmentConsultation/AppointmentConsultation";
import  "./App.css";

function App() {
  return (
      <Router>
        <Route path="/" component={Navbar} />
        <Route path="/admin-*" component={LeftNavbar} />
        <Route path="/doctor-*" component={LeftNavbarDoctor} />
        <Route path="/user-*" component={LeftNavbarUser} />
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
          <PrivateRoute exact path="/admin-read-messages" component={ReadMessages} />
          <PrivateRoute exact path="/admin-unread-messages" component={UnreadMessages} />
          <PrivateRoute exact path="/admin-update-message/:messageId" component={UpdateMessage} />
          <PrivateRoute exact path="/admin-doctor-session-logs" component={DoctorSessionLogs} />
          <PrivateRoute exact path="/admin-user-session-logs" component={UserSessionLogs} />
          <PrivateRoute exact path="/admin-reports" component={Reports} />
          <PrivateRoute exact path="/admin-search-patient" component={SearchPatient} />
     
          <PrivateRoute exact path="/doctor-dashboard" component={DoctorDashboard} />

          <PrivateRoute exact path="/user-dashboard" component={UserDashboard} />
          <PrivateRoute exact path="/user-appointment-consultation" component={AppointmentConsultation} />
        </Switch>
    </Router>
  );
}

export default App;
