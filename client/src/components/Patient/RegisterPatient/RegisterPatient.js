import React from 'react';
import { Link } from 'react-router-dom';

import styles from "../../Admin/LoginAdmin/LoginAdmin.module.css";

const RegisterPatient = () => {
  return (
    <form className={[styles.form, styles.formRegister].join(" ")}>
      <div className={styles.description}>
        <h1><i className="fas fa-user"></i>{" "}Patient</h1>
        <p>Register as a Patient</p>
      </div>
      <div className={styles.inputGroup}>
        <label>* Patient name: </label>
        <div className={[styles.inputRegister].join(" ")}>
          <input type="text" placeholder="Enter firstname..."/>
          <input type="text" placeholder="Enter lastname..."/>
        </div>
      </div>
      <div className={styles.inputGroup}>
        <label>* Patient email: </label>
        <div className={[styles.inputRegister, styles.emailIcon].join(" ")} >
          <input type="email" placeholder="Enter email..."/>
        </div>
      </div>
      <div className={styles.inputGroup}>
        <label>* Patient location: </label>
        <div className={[styles.inputRegister, styles.locationIcon].join(" ")} >
          <input type="email" placeholder="Enter email..."/>
        </div>
      </div>
      <div className={[styles.inputCheckbox].join(" ")} >
        <label>* Gender: </label>
        <label>Male </label>
        <input type="checkbox" name="" value="" />
        <label>Female</label>
        <input type="checkbox" name="" value="" />
      </div>
      <div className={styles.inputGroup}>
        <label>* Patient password: </label>
        <div className={[styles.inputRegister, styles.passwordIcon].join(" ")} >
          <input type="password" placeholder="Enter password..."/>
        </div>
      </div>
      <div className={styles.inputGroup}>
        <label>* Patient repeat password: </label>
        <div className={[styles.inputRegister, styles.passwordIcon].join(" ")} >
          <input type="password" placeholder="Enter password..."/>
        </div>
        <span>[* = required]</span>
      </div>
      <input type="submit" value="Register"/>
      <span className={styles.span}>Already registered? Login <Link to="/login-patient">here</Link></span>
    </form>
  );
};

export default RegisterPatient;