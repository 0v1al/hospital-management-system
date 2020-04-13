import React, { useState } from "react";

import styles from "./LeftNavbar.module.css";
import { Link } from "react-router-dom";

const LeftNavbar = () => {
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
          <Link to="/admin-dashboard" className={styles.leftNavbarLink}>
            <i className={[`fas fa-home ${styles.leftNavbarIcon}`].join(" ")}></i>
            Dashboard
          </Link>
        </li>
        <li>
          <a href="#!" className={styles.leftNavbarLink} onClick={e => toggleLeftnavbarSubmenu(e)}>
            <i className={[`fas fa-user-md ${styles.leftNavbarIcon}`].join(" ")}></i>
            Doctors
            <i className={[`fas fa-chevron-right ${styles.leftNavbarArrow}`].join(" ")}></i>
          </a>
          <ul href="#!" className={[styles.leftNavbarLinks, styles.leftNavbarSubmenuLinks].join(" ")}>
            <Link to="/admin-doctor-specialization" className={[styles.leftNavbarLink, styles.leftNavbarSubmenuLink].join(" ")}>
              Doctor Specialization
            </Link>
            <Link to="/admin-add-doctor" className={[styles.leftNavbarLink, styles.leftNavbarSubmenuLink].join(" ")}>
              Add Doctor
            </Link>
            <Link to="/admin-manage-doctor" className={[styles.leftNavbarLink, styles.leftNavbarSubmenuLink].join(" ")}>
              Manage Doctors
            </Link>
          </ul>
        </li>
        <li>
          <Link to="/admin-users" className={styles.leftNavbarLink}>
            <i className={[`fas fa-user ${styles.leftNavbarIcon}`].join(" ")}></i>
            Users
          </Link>
        </li>
        <li>
          <Link to="/admin-patients" className={styles.leftNavbarLink}>
            <i className={[`fas fa-user-injured ${styles.leftNavbarIcon}`].join(" ")}></i>
            Patients
          </Link>
        </li>
        <li>
          <a href="#!" className={styles.leftNavbarLink}>
            <i className={[`fas fa-file ${styles.leftNavbarIcon}`].join(" ")}></i>
            Apointment History
          </a>
        </li>
        <li>
          <a href="#!" className={styles.leftNavbarLink} onClick={e => toggleLeftnavbarSubmenu(e)}>
            <i className={[`fas fa-copy ${styles.leftNavbarIcon}`].join(" ")}></i>
            Contact Messages
            <i className={[`fas fa-chevron-right ${styles.leftNavbarArrow}`].join(" ")}></i>
          </a>
          <ul className={[styles.leftNavbarLinks, styles.leftNavbarSubmenuLinks].join(" ")}>
            <Link to="/admin-unread-messages" className={[styles.leftNavbarLink, styles.leftNavbarSubmenuLink].join(" ")}>
              Unread Messages
            </Link>
            <Link to="/admin-read-messages" className={[styles.leftNavbarLink, styles.leftNavbarSubmenuLink].join(" ")}>
              Read Messages
            </Link>
          </ul>
        </li>
        <li>
          <Link to="/admin-doctor-session-logs" className={styles.leftNavbarLink}>
            <i className={[`fas fa-list-alt ${styles.leftNavbarIcon}`].join(" ")}></i>
            Doctor Session Logs
          </Link>
        </li>
        <li>
          <Link to="/admin-user-session-logs" className={styles.leftNavbarLink}>
            <i className={[`fas fa-list-alt ${styles.leftNavbarIcon}`].join(" ")}></i>
            User Session Logs
          </Link>
        </li>
        <li>
          <Link to="/admin-reports" className={styles.leftNavbarLink}>
            <i className={[`fas fa-exclamation-circle ${styles.leftNavbarIcon}`].join(" ")}></i>
            Reports
          </Link>
        </li>
        <li>
          <Link to="/admin-search-patient" className={styles.leftNavbarLink}>
            <i className={[`fas fa-search ${styles.leftNavbarIcon}`].join(" ")}></i>
            Search Patient
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default LeftNavbar;