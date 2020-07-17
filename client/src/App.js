import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  PrivateRouteUser,
  PrivateRouteAdmin,
  PrivateRouteDoctor,
} from "./components/PrivateRoute";

import Navbar from "./components/Layout/Navbar/Navbar";
import Landing from "./components/Layout/Landing/Landing";
import Contact from "./components/Contact/Contact";
import LoginDoctor from "./components/Doctor/LoginDoctor/LoginDoctor";
import LoginUser from "./components/User/LoginUser/LoginUser";
import LoginAdmin from "./components/Admin/LoginAdmin/LoginAdmin";
import RegisterUser from "./components/User/RegisterUser/RegisterUser";
import AdminDashboard from "./components/Admin/AdminDashboard/AdminDashboard";
import LeftNavbar from "./components/Layout/LeftNavbar/LeftNavbar";
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
import AppointmentHistory from "./components/User/AppointmentHistory/AppointmentHistory";
import DoctorAppointmentHistory from "./components/Doctor/AppointmentHistory/AppointmentHistory";
import AddPatient from "./components/Doctor/AddPatient/AddPatient";
import ManagePatient from "./components/Doctor/ManagePatient/ManagePatient";
import UpdatePatient from "./components/Doctor/UpdatePatient/UpdatePatient";
import ViewPatient from "./components/Doctor/ViewPatient/ViewPatient";
import MedicalHistory from "./components/User/MedicalHistory/MedicalHistory";
import DoctorSearchPatient from "./components/Doctor/SearchPatient/SearchPatient";
import DoctorChangePassword from "./components/Doctor/ChangePassword/ChangePassword";
import DoctorUpdateProfile from "./components/Doctor/UpdateProfile/UpdateProfile";
import UserChangePassword from "./components/User/ChangePassword/ChangePassword";
import UserUpdateProfile from "./components/User/UpdateProfile/UpdateProfile";
import AdminChangePassword from "./components/Admin/ChangePassword/ChangePassword";
import AdminAppointmentHistory from "./components/Admin/AdminAppointmentHistory/AppointmentHistory";
import UserViewDoctors from "./components/User/ViewDoctor/ViewDoctor";
import Footer from "./components/Layout/Footer/Footer";

import "./App.css";

function App() {
  return (
    <Router>
      <Route path="/" component={Navbar} />
      <Route path="/admin-*" component={LeftNavbar} />
      <Route path="/doctor-*" component={LeftNavbarDoctor} />
      <Route path="/user-*" component={LeftNavbarUser} />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login-doctor" component={LoginDoctor} />
        <Route exact path="/login-user" component={LoginUser} />
        <Route exact path="/login-admin" component={LoginAdmin} />
        <Route exact path="/register-user" component={RegisterUser} />
        <Route exact path="/contact" component={Contact} />

        <PrivateRouteAdmin
          exact
          path="/admin-dashboard"
          component={AdminDashboard}
        />
        <PrivateRouteAdmin
          exact
          path="/admin-doctor-specialization"
          component={DoctorSpecialization}
        />
        <PrivateRouteAdmin
          exact
          path="/admin-add-doctor"
          component={AddDoctor}
        />
        <PrivateRouteAdmin
          exact
          path="/admin-manage-doctor"
          component={ManageDoctor}
        />
        <PrivateRouteAdmin
          exact
          path="/admin-update-doctor/:doctorEmail"
          component={UpdateDoctor}
        />
        <PrivateRouteAdmin exact path="/admin-users" component={Users} />
        <PrivateRouteAdmin exact path="/admin-patients" component={Patients} />
        <PrivateRouteAdmin
          exact
          path="/admin-patient-details/:patientEmail/:patientId"
          component={PatientDetails}
        />
        <PrivateRouteAdmin
          exact
          path="/admin-read-messages"
          component={ReadMessages}
        />
        <PrivateRouteAdmin
          exact
          path="/admin-unread-messages"
          component={UnreadMessages}
        />
        <PrivateRouteAdmin
          exact
          path="/admin-update-message/:messageId"
          component={UpdateMessage}
        />
        <PrivateRouteAdmin
          exact
          path="/admin-doctor-session-logs"
          component={DoctorSessionLogs}
        />
        <PrivateRouteAdmin
          exact
          path="/admin-user-session-logs"
          component={UserSessionLogs}
        />
        <PrivateRouteAdmin exact path="/admin-reports" component={Reports} />
        <PrivateRouteAdmin
          exact
          path="/admin-search-patient"
          component={SearchPatient}
        />
        <PrivateRouteAdmin
          exact
          path="/admin-change-password"
          component={AdminChangePassword}
        />
        <PrivateRouteAdmin
          exact
          path="/admin-appointment-history"
          component={AdminAppointmentHistory}
        />

        <PrivateRouteDoctor
          exact
          path="/doctor-dashboard"
          component={DoctorDashboard}
        />
        <PrivateRouteDoctor
          exact
          path="/doctor-appointment-history"
          component={DoctorAppointmentHistory}
        />
        <PrivateRouteDoctor
          exact
          path="/doctor-add-patient"
          component={AddPatient}
        />
        <PrivateRouteDoctor
          exact
          path="/doctor-manage-patient"
          component={ManagePatient}
        />
        <PrivateRouteDoctor
          exact
          path="/doctor-update-patient/:patientEmail"
          component={UpdatePatient}
        />
        <PrivateRouteDoctor
          exact
          path="/doctor-view-patient/:patientId"
          component={ViewPatient}
        />
        <PrivateRouteDoctor
          exact
          path="/doctor-search-patient"
          component={DoctorSearchPatient}
        />
        <PrivateRouteDoctor
          exact
          path="/doctor-change-password"
          component={DoctorChangePassword}
        />
        <PrivateRouteDoctor
          exact
          path="/doctor-update-profile"
          component={DoctorUpdateProfile}
        />

        <PrivateRouteUser
          exact
          path="/user-dashboard"
          component={UserDashboard}
        />
        <PrivateRouteUser
          exact
          path="/user-appointment-consultation"
          component={AppointmentConsultation}
        />
        <PrivateRouteUser
          exact
          path="/user-appointment-history"
          component={AppointmentHistory}
        />
        <PrivateRouteUser
          exact
          path="/user-medical-history"
          component={MedicalHistory}
        />
        <PrivateRouteUser
          exact
          path="/user-change-password"
          component={UserChangePassword}
        />
        <PrivateRouteUser
          exact
          path="/user-update-profile"
          component={UserUpdateProfile}
        />
        <PrivateRouteUser
          exact
          path="/user-view-doctors"
          component={UserViewDoctors}
        />
      </Switch>
      {/* <Route path="/user-*" component={Footer} />
      <Route path="/doctor-*" component={Footer} />
      <Route path="/admin-*" component={Footer} /> */}
    </Router>
  );
}

export default App;
