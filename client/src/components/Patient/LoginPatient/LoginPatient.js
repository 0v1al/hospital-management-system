import React, { useState, useEffect } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loginPatient } from "../../actions/patient";
import { removeCookie } from "../../cookie";

import styles from "../../Admin/LoginAdmin/LoginAdmin.module.css";

const LoginPatient = ({ alerts, loginPatient, history, loggedAdmin, loggedDoctor, loggedPatient }) => {
  const [input, setInput] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    removeCookie("token");
  }, [])

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

  const { email, password } = input;

  const loginSubmit = async e => {
    e.preventDefault();
    loginPatient(input, history);
  }
  return (
    <>
      <img src={require("../../../assets/bg2.jpg")} alt="wallpaper" className={styles.background} />
      <form className={styles.form} onSubmit={e => loginSubmit(e)}>
        {/* <div className="alerts"> */}
          {alerts.length > 0 && <div className="alerts">{alerts.map(alert => 
            <span key={alert.id} className={`alert alert-${alert.type}`}>{alert.msg}</span>
          )} 
          </div>
        }
        {/* </div> */}
        <div className={styles.description}>
          <h1><i className="fas fa-user"></i>{" "}Patient</h1>
          <p>Login as a Patient</p>
        </div>
        <div className={styles.inputGroup}>
          <label>* Patient email:</label>
          <div className={[styles.inputRegister, styles.emailIcon].join(" ")}>
            <input type="text" placeholder="Enter email..." name="email" value={email} onChange={e => setInput({ ...input, [e.target.name]: e.target.value })}/>
          </div>
        </div>
        <div className={styles.inputGroup}>
          <label>* Patient password:</label>
          <div className={[styles.inputRegister, styles.passwordIcon].join(" ")}>
            <input type="password" placeholder="Enter password..." name="password" value={password} onChange={e => setInput({ ...input, [e.target.name]: e.target.value })}/>
          </div>
          <span>[* = required]</span>
        </div>
        <input type="submit" value="Login"/>
        <span className={styles.span}>Don't have an account? Register <Link to="/register-patient">here</Link></span>
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

export default connect(mapStateToProps, { loginPatient })(withRouter(LoginPatient));