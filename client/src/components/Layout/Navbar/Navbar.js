import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutAdmin } from "../../actions/admin";
import { logoutDoctor } from "../../actions/doctor";
import { logoutUser } from "../../actions/user";

import styles from "./Navbar.module.css";

const Navbar = ({ loggedAdmin, loggedDoctor, loggedUser, logoutAdmin, logoutDoctor, logoutUser, loadingAdmin, loadingDoctor, loadingUser, doctorEmail, userEmail,  history }) => {
	let links;

	const logoutAdminNow = e => {
		e.preventDefault();
		logoutAdmin(history);
	}

	const logoutDoctorNow = e => {
		e.preventDefault();
		logoutDoctor(history, doctorEmail);
	}

	const logoutUserNow = e => {
		e.preventDefault();
		logoutUser(history, userEmail);
	}

	if (!loggedAdmin && !loggedDoctor && !loggedUser) {
		links = (
			<ul className={styles.navbarLinks}>
				<Link to="/contact" className={styles.navbarLink}>Contact</Link>
				<Link to="/login-user" className={styles.navbarLink}>Patients</Link>
				<Link to="/login-doctor" className={styles.navbarLink}>Doctors</Link>
				<Link to="/login-admin" className={styles.navbarLink}>Admin</Link>
			</ul>
			);
	}

	if (loggedAdmin || loggedDoctor || loggedUser) {
		if (loggedAdmin) {
			links = (
			<ul className={styles.navbarLinks}>
				<div className={[styles.navbarLink, styles.navbarSettings].join(" ")}>
					<i className="fas fa-user-circle"></i>
					<div className={styles.navbarSettingsOptions}>
							<Link to="/admin-change-password">
								<i className="fas fa-lock"></i>
								Change Password
							</Link>
							<a href="#!" onClick={e => logoutAdminNow(e)}>
								<i className="fas fa-sign-out-alt"></i>
								Logout
							</a>
					</div>
				</div>
			</ul>
			)
		}
		
		if (loggedDoctor) {
			links = (
				<ul className={styles.navbarLinks}>
					<div className={[styles.navbarLink, styles.navbarSettings].join(" ")}>
						<i className="fas fa-user-circle"></i>
						<div className={styles.navbarSettingsOptions}>
							<Link to="/doctor-update-profile"><i className="fas fa-user"></i>My Profile</Link>
							<Link to="/doctor-change-password"><i className="fas fa-lock"></i>Change Password</Link>
							<a href="#!" onClick={e => logoutDoctorNow(e)}><i className="fas fa-sign-out-alt"></i>Logout</a>
						</div>
					</div>
				</ul>
				)
		}

		if (loggedUser) {
			links = (
				<ul className={styles.navbarLinks}>
					<div className={[styles.navbarLink, styles.navbarSettings].join(" ")}>
						<i className="fas fa-user-circle"></i>
						<div className={styles.navbarSettingsOptions}>
								<Link to="/user-update-profile">
									<i className="fas fa-user"></i>
									My Profile
								</Link>
								<Link to="/user-change-password">
									<i className="fas fa-lock"></i>
									Change Password
								</Link>
								<a href="#!" onClick={e => logoutUserNow(e)}><i className="fas fa-sign-out-alt"></i>Logout</a>
						</div>
					</div>
				</ul>
				)
		}
	}

	const loaded = loadingAdmin && loadingDoctor && loadingUser;

	return (
		<nav className={styles.navbar}>
			<Link to="/" className={styles.navbarHeader}>
				<i className="fas fa-h-square"></i>
				HMS
			</Link>
			{!loaded ? links : links}
		</nav>
	);
};

const mapStateToProps = state => ({
	loggedAdmin: state.admin.logged,
	loadingAdmin: state.admin.loading,
	loggedDoctor: state.doctor.logged,
	loadingDoctor: state.doctor.loading,
	doctorEmail: state.doctor.email,
	loggedUser: state.user.logged,
	loadingUser: state.user.loading,
	userEmail: state.user.email
});

export default connect(mapStateToProps, { logoutAdmin, logoutDoctor, logoutUser })(withRouter(Navbar));