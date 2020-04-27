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
             Consultations
          </Link>
        </li>
        <li>
          <Link to="/user-appointment-history" className={styles.leftNavbarLink}>
            <i className={[`fas fa-list-alt ${styles.leftNavbarIcon}`].join(" ")}></i>
            Consultations History
          </Link>
        </li>
        <li>
          <Link to="/user-medical-history" className={styles.leftNavbarLink}>
            <i className={[`fas fa-list ${styles.leftNavbarIcon}`].join(" ")}></i>
              Medical History
          </Link>
        </li>
        <li>
          <Link to="/user-view-doctors" className={styles.leftNavbarLink}>
            <i className={[`fas fa-user-md ${styles.leftNavbarIcon}`].join(" ")}></i>
              View Doctors
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default LeftNavbarUser;