import React from "react";
import { Link } from "react-router-dom";

import styles from "../../Admin/LoginAdmin/LoginAdmin.module.css";

const LoginPatient = () => {
  return (
    <form className={styles.form}>
      <div className={styles.description}>
        <h1><i class="fas fa-user"></i>{" "}Patient</h1>
        <p>Login as a Patient</p>
      </div>
      <div className={styles.inputGroup}>
        <label>* Patient email:</label>
        <div className={[styles.inputRegister, styles.emailIcon].join(" ")}>
          <input type="email" placeholder="Enter email..."/>
        </div>
      </div>
      <div className={styles.inputGroup}>
        <label>* Patient password:</label>
        <div className={[styles.inputRegister, styles.passwordIcon].join(" ")}>
          <input type="password" placeholder="Enter password..."/>
        </div>
        <span>[* = required]</span>
      </div>
      <input type="submit" value="Login"/>
      <span className={styles.span}>Don't have an account? Register <Link to="/register-patient">here</Link></span>
    </form>
  );
}

export default LoginPatient;