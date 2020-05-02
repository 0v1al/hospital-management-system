import React, { useState } from "react";
import { Link } from "react-router-dom";

import styles from "../../Layout/LeftNavbar/LeftNavbar.module.css";

const LeftNavbarDoctor = () => {
  const [openSubmenu, toggleSubmenu] = useState(true);

  const toggleLeftnavbarSubmenu = e => {
    toggleSubmenu(!openSubmenu);
    let leftnavSubmenu = e.target.parentElement.lastChild;
    let leftnavArrow = e.target.lastChild;
    if (openSubmenu) {
      leftnavSubmenu.classList.add(`${styles.showSubmenu}`);
      leftnavArrow.classList.add(`${styles.arrowRotate}`);
    } else {
      leftnavSubmenu.classList.remove(`${styles.showSubmenu}`);
      leftnavArrow.classList.remove(`${styles.arrowRotate}`);
    }
    //TODO because all links share the same state (openSubmenu) when a submenu is left open the openSubmenu will be set to true wich means that when you try to open in the same time another submenu you will need to click two times
  };

  return (
    <nav className={styles.leftNavbar}>
      <h3 className={styles.leftNavbarHeader}>main navigation</h3>
      <ul className={styles.leftNavbarLinks}>
        <li>
          <Link to="/doctor-dashboard" className={styles.leftNavbarLink}>
            <i className={[`fas fa-home ${styles.leftNavbarIcon}`].join(" ")}></i>
            Dashboard
          </Link>
        </li>
        <li>
          <a href="#!" className={styles.leftNavbarLink} onClick={e => toggleLeftnavbarSubmenu(e)}>
            <i className={[`fas fa-user-injured ${styles.leftNavbarIcon}`].join(" ")}></i>
            Patients
            <i className={[`fas fa-chevron-right ${styles.leftNavbarArrow}`].join(" ")}></i>
          </a>
          <ul className={[styles.leftNavbarLinks, styles.leftNavbarSubmenuLinks].join(" ")}>
            <Link to="/doctor-add-patient" className={[styles.leftNavbarLink, styles.leftNavbarSubmenuLink].join(" ")}>
              Add Patient
            </Link>
            <Link to="/doctor-manage-patient" className={[styles.leftNavbarLink, styles.leftNavbarSubmenuLink].join(" ")}>
              Manage Patients
            </Link>
          </ul>
        </li>
        <li>
          <Link to="/doctor-appointment-history" className={styles.leftNavbarLink}>
            <i className={[`fas fa-file ${styles.leftNavbarIcon}`].join(" ")}></i>
            Consultations
          </Link>
        </li>
        <li>
          <Link to="/doctor-search-patient" className={styles.leftNavbarLink}>
            <i className={[`fas fa-search ${styles.leftNavbarIcon}`].join(" ")}></i>
            Patient Search
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default LeftNavbarDoctor;