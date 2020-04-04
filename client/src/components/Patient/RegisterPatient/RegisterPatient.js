import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { registerPatient  } from "../../actions/patient";

import styles from "../../Admin/LoginAdmin/LoginAdmin.module.css";

const RegisterPatient = ({ alerts, registerPatient, history }) => {
  const [input, setInput] = useState({
    firstname: "",
    lastname: "",
    email: "",
    location: "",
    password: "",
    passwordRepeat: ""
  });

  const { firstname, lastname, email, location, password, passwordRepeat } = input;

  const registerPatientSubmit = async e => {
    e.preventDefault();
    registerPatient(input, history);
  };

  return (
    <>
     <img src={require("../../../assets/bg3.jpg")} alt="wallpaper" className={[styles.background, styles.bg].join(" ")} />
      <form className={[styles.form, styles.formRegister].join(" ")} onSubmit={e => registerPatientSubmit(e)}>
        <div className="alerts">
          {alerts && alerts.map(alert => 
            <span key={alert.id} className={`alert alert-${alert.type}`}>{alert.msg}</span>
          )}
        </div>
        <div className={styles.description}>
          <h1><i className="fas fa-user"></i>{" "}Patient</h1>
          <p>Register as a Patient</p>
        </div>
        <div className={styles.inputGroup}>
          <label>* Patient name: </label>
          <div className={[styles.inputRegister].join(" ")}>
            <input type="text" placeholder="Enter firstname..." name="firstname" value={firstname} onChange={e => setInput({ ...input, [e.target.name]: e.target.value })}/>
            <input type="text" placeholder="Enter lastname..." name="lastname" value={lastname} onChange={e => setInput({ ...input, [e.target.name]: e.target.value })}/>
          </div>
        </div>
        <div className={styles.inputGroup}>
          <label>* Patient email: </label>
          <div className={[styles.inputRegister, styles.emailIcon].join(" ")} >
            <input type="text" placeholder="Enter email..." name="email" value={email} onChange={e => setInput({ ...input, [e.target.name]: e.target.value })}/>
          </div>
        </div>
        <div className={styles.inputGroup}>
          <label>* Patient location: </label>
          <div className={[styles.inputRegister, styles.locationIcon].join(" ")} >
            <input type="location" placeholder="Enter location..." name="location" value={location} onChange={e => setInput({ ...input, [e.target.name]: e.target.value })}/>
          </div>
        </div>
        <div className={[styles.inputCheckbox].join(" ")} >
          <label>* Gender: </label>
          <label>Male </label>
          <input type="checkbox" name="male" value="" />
          <label>Female</label>
          <input type="checkbox" name="female" value="" />
        </div>
        <div className={styles.inputGroup}>
          <label>* Patient password: </label>
          <div className={[styles.inputRegister, styles.passwordIcon].join(" ")} >
            <input type="password" placeholder="Enter password..." name="password" value={password} onChange={e => setInput({ ...input, [e.target.name]: e.target.value })}/>
          </div>
        </div>
        <div className={styles.inputGroup}>
          <label>* Patient repeat password: </label>
          <div className={[styles.inputRegister, styles.passwordIcon].join(" ")} >
            <input type="password" placeholder="Enter password..." name="passwordRepeat" value={passwordRepeat} onChange={e => setInput({ ...input, [e.target.name]: e.target.value })}/>
          </div>
          <span>[* = required]</span>
        </div>
        <input type="submit" value="Register"/>
        <span className={styles.span}>Already registered? Login <Link to="/login-patient">here</Link></span>
      </form>
    </>
  );
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps, { registerPatient })(withRouter(RegisterPatient));