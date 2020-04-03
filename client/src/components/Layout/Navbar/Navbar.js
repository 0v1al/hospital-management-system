import React from "react";
import { Link } from "react-router-dom";

import styles from "./Navbar.module.css";

const Navbar = () => {
	return (
		<nav className={styles.navbar}>
			<Link to="/" className={styles.navbarHeader}>
				<i className="fas fa-h-square"></i>
				HMS
			</Link>
			<ul className={styles.navbarLinks}>
				<Link to="/login-patient" className={styles.navbarLink}>Patients</Link>
				<Link to="/login-doctor" className={styles.navbarLink}>Doctors</Link>
				<Link to="/login-admin" className={styles.navbarLink}>Admin</Link>
				<div className={[styles.navbarLink, styles.navbarSettings].join(" ")}>
					<i className="fas fa-user-circle"></i>
					<div className={styles.navbarSettingsOptions}>
							<a href="#!"><i className="fas fa-user"></i>My Profile</a>
							<a href="#!"><i className="fas fa-lock"></i>Change Password</a>
							<a href="#!"><i className="fas fa-sign-out-alt"></i>Logout</a>
					</div>
				</div>
			</ul>
		</nav>
	);
};

export default Navbar;