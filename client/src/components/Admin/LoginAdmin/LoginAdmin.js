import React from "react";

import styles from "./LoginAdmin.module.css";

const LoginAdmin = () => {
  return (
    <form className={styles.form}>
      <div className={styles.description}>
        <h1><i className="fas fa-user-cog"></i>{" "}Admin</h1>
        <p>Login as an admin</p>
      </div>
      <div className={styles.inputGroup}>
        <label>* Admin email:</label>
        <div className={[styles.inputRegister, styles.emailIcon].join(" ")}>
          <input type="email" placeholder="Enter email..."/>
        </div>
      </div>
      <div className={styles.inputGroup}>
        <label>* Admin password:</label>
        <div className={[styles.inputRegister, styles.passwordIcon].join(" ")}>
          <input type="password" placeholder="Enter password..."/>
        </div>
        <span>[* = required]</span>
      </div>
      <input type="submit" value="Login"/>
    </form>
  );
}

export default LoginAdmin;