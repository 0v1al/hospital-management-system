import React from "react";

import styles from "../../Layout/LeftNavbar/LeftNavbar.module.css";

const LeftNavbarUser = () => {

  return (
    <nav className={styles.leftNavbar}>
      <h3 className={styles.leftNavbarHeader}>main navigation</h3>
      <ul className={styles.leftNavbarLinks}>
        <li>
          <a href="#!" className={styles.leftNavbarLink}>
            <i className={[`fas fa-home ${styles.leftNavbarIcon}`].join(" ")}></i>
            Dashboard
          </a>
        </li>
        <li>
          <a href="#!" className={styles.leftNavbarLink}>
            <i className={[`fas fa-book-open ${styles.leftNavbarIcon}`].join(" ")}></i>
            Book Appointment
          </a>
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