import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { loginDoctor } from "../../actions/doctor";
import { withRouter, Redirect, Link } from "react-router-dom";
import { removeCookie } from "../../cookie";

import styles from "../../Admin/LoginAdmin/LoginAdmin.module.css";

const LoginDoctor = ({ alerts, loginDoctor, history, loggedAdmin, loggedDoctor, loggedPatient }) => {
  const [input, setInput] = useState({
    email: "",
    password: ""
  });
  
  useEffect(() => {
    removeCookie("token");
  }, [])

  const { email, password } = input; 

  if (loggedAdmin || loggedDoctor || loggedPatient) {
    if (loggedAdmin) {
        return <Redirect to="/admin-dashboard"/>
    }
    
    if (loggedDoctor) {
      return <Redirect to="/doctor-dashboard"/>
    }
    
    if (loggedPatient) {
      return <Redirect to="/patient-dashboard"/>
    }
  }

  const loginDoctorSubmit = async e => {
    e.preventDefault();
    loginDoctor(input, history);
  }
  
  return (
    <>
     <img src={require("../../../assets/bg2.jpg")} alt="wallpaper" className={styles.background} />
      <form className={styles.form} onSubmit={e => loginDoctorSubmit(e)}>
        {alerts.length > 0 && <div className="alerts">{alerts.map(alert => 
            <span key={alert.id} className={`alert alert-${alert.type}`}>{alert.msg}</span>
          )} 
          </div>
        }
        <div className={styles.description}>
          <h1><i className="fas fa-user-md"></i>{" "}Doctor</h1>
          <p>Login as a Doctor</p>
        </div>
        <div className={styles.inputGroup}>
          <label>* Doctor email:</label>
          <div className={[styles.inputRegister, styles.emailIcon].join(" ")}>
            <input type="text" placeholder="Enter email..." name="email" value={email} onChange={e => setInput({ ...input, [e.target.name]: e.target.value })}/>
          </div>
        </div>
        <div className={styles.inputGroup}>
          <label>* Doctor password:</label>
          <div className={[styles.inputRegister, styles.passwordIcon].join(" ")}>
            <input type="password" placeholder="Enter password..." name="password" value={password} onChange={e => setInput({ ...input, [e.target.name]: e.target.value })}/>
          </div>
          <span>[* = required]</span>
        </div>
        <input type="submit" value="Login"/>
        <Link to="/" className={styles.back}>
          <i className="fas fa-chevron-left"></i>
          Back
        </Link>
      </form>
    </>
  );
}

const mapStateToProps = state => ({
  alerts: state.alert,
  loggedAdmin: state.admin.firstLogin,
  loggedDoctor: state.doctor.firstLogin,
  loggedPatient: state.patient.firstLogin
});

export default connect(mapStateToProps, { loginDoctor })(withRouter(LoginDoctor));