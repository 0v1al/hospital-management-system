import React from "react";
import { Link } from "react-router-dom";

import styles from "../../Layout/LeftNavbar/LeftNavbar.module.css";

const LeftNavbarUser = () => {

  return (
    <nav className={styles.leftNavbar}>
      <h3 className={styles.leftNavbarHeader}>main navigation</h3>
      <ul className={styles.leftNavbarLinks}>
        <li>
          <Link to="/user-dashboard" className={styles.leftNavbarLink}>
            <i className={[`fas fa-home ${styles.leftNavbarIcon}`].join(" ")}></i>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/user-appointment-consultation" className={styles.leftNavbarLink}>
            <i className={[`fas fa-book-open ${styles.leftNavbarIcon}`].join(" ")}></i>
            Appointment Consultation
          </Link>
        </li>
        <li>
          <a href="#!" className={styles.leftNavbarLink}>
            <i className={[`fas fa-list-alt ${styles.leftNavbarIcon}`].join(" ")}></i>
            Appointment History
          </a>
        </li>
        <li>
          <a href="#!" className={styles.leftNavbarLink}>
            <i className={[`fas fa-list ${styles.leftNavbarIcon}`].join(" ")}></i>
              Medical History
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default LeftNavbarUser;