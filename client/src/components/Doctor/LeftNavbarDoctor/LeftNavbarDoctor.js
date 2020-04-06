import React, { useState } from "react";

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
          <a href="#!" className={styles.leftNavbarLink}>
            <i className={[`fas fa-home ${styles.leftNavbarIcon}`].join(" ")}></i>
            Dashboard
          </a>
        </li>
        <li>
          <a href="#!" className={styles.leftNavbarLink} onClick={e => toggleLeftnavbarSubmenu(e)}>
            <i className={[`fas fa-user-injured ${styles.leftNavbarIcon}`].join(" ")}></i>
            Patients
            <i className={[`fas fa-chevron-right ${styles.leftNavbarArrow}`].join(" ")}></i>
          </a>
          <ul className={[styles.leftNavbarLinks, styles.leftNavbarSubmenuLinks].join(" ")}>
            <a href="#!"className={[styles.leftNavbarLink, styles.leftNavbarSubmenuLink].join(" ")}>
            {/* <i className={[`fas fa-user-md ${styles.leftNavbarIcon}`].join(" ")}></i> */}
              link1
            </a>
            <a href="#!" className={[styles.leftNavbarLink, styles.leftNavbarSubmenuLink].join(" ")}>
              {/* <i className={[`fas fa-user-md ${styles.leftNavbarIcon}`].join(" ")}></i> */}
              link1
            </a>
            <a href="#!" className={[styles.leftNavbarLink, styles.leftNavbarSubmenuLink].join(" ")}>
              {/* <i className={[`fas fa-user-md ${styles.leftNavbarIcon}`].join(" ")}></i> */}
              link1
            </a>
          </ul>
        </li>
        <li>
          <a href="#!" className={styles.leftNavbarLink}>
            <i className={[`fas fa-file ${styles.leftNavbarIcon}`].join(" ")}></i>
            Apointment History
          </a>
        </li>
        <li>
          <a href="#!" className={styles.leftNavbarLink}>
            <i className={[`fas fa-search ${styles.leftNavbarIcon}`].join(" ")}></i>
            Patient Search
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default LeftNavbarDoctor;