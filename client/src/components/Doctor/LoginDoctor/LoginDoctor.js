import React from "react";

import styles from "../../Admin/LoginAdmin/LoginAdmin.module.css";

const LoginDoctor = () => {
  return (
    <form className={styles.form}>
      <div className={styles.description}>
        <h1><i className="fas fa-user-md"></i>{" "}Doctor</h1>
        <p>Login as a Doctor</p>
      </div>
      <div className={styles.inputGroup}>
        <label>* Doctor email:</label>
        <div className={[styles.inputRegister, styles.emailIcon].join(" ")}>
          <input type="email" placeholder="Enter email..."/>
        </div>
      </div>
      <div className={styles.inputGroup}>
        <label>* Doctor password:</label>
        <div className={[styles.inputRegister, styles.passwordIcon].join(" ")}>
          <input type="password" placeholder="Enter password..."/>
        </div>
        <span>[* = required]</span>
      </div>
      <input type="submit" value="Login"/>
    </form>
  );
}

export default LoginDoctor;