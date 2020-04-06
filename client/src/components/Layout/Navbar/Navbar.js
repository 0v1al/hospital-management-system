import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutAdmin } from "../../actions/admin";
import { logoutDoctor } from "../../actions/doctor";
import { logoutPatient } from "../../actions/patient";

import styles from "./Navbar.module.css";

const Navbar = ({ loggedAdmin, loggedDoctor, loggedPatient, logoutAdmin, logoutDoctor, logoutPatient, loadingAdmin, loadingDoctor, loadingPatient,  history }) => {
	let links;

	const logoutAdminNow = e => {
		e.preventDefault();
		logoutAdmin(history);
	}

	const logoutDoctorNow = e => {
		e.preventDefault();
		logoutDoctor(history);
	}

	const logoutPatientNow = e => {
		e.preventDefault();
		logoutPatient(history);
	}

	if (!loggedAdmin && !loggedDoctor && !loggedPatient) {
		links = (
			<ul className={styles.navbarLinks}>
				<Link to="/login-patient" className={styles.navbarLink}>Patients</Link>
				<Link to="/login-doctor" className={styles.navbarLink}>Doctors</Link>
				<Link to="/login-admin" className={styles.navbarLink}>Admin</Link>
			</ul>
			);
	}

	if (loggedAdmin || loggedDoctor || loggedPatient) {
		if (loggedAdmin) {
			links = (
			<ul className={styles.navbarLinks}>
				<div className={[styles.navbarLink, styles.navbarSettings].join(" ")}>
					<i className="fas fa-user-circle"></i>
					<div className={styles.navbarSettingsOptions}>
							<a href="#!"><i className="fas fa-user"></i>My Profile</a>
							<a href="#!"><i className="fas fa-lock"></i>Change Password</a>
							<a href="#!" onClick={e => logoutAdminNow(e)}><i className="fas fa-sign-out-alt"></i>Logout</a>
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
								<a href="#!"><i className="fas fa-user"></i>My Profile</a>
								<a href="#!"><i className="fas fa-lock"></i>Change Password</a>
								<a href="#!" onClick={e => logoutDoctorNow(e)}><i className="fas fa-sign-out-alt"></i>Logout</a>
						</div>
					</div>
				</ul>
				)
		}

		if (loggedPatient) {
			links = (
				<ul className={styles.navbarLinks}>
					<div className={[styles.navbarLink, styles.navbarSettings].join(" ")}>
						<i className="fas fa-user-circle"></i>
						<div className={styles.navbarSettingsOptions}>
								<a href="#!"><i className="fas fa-user"></i>My Profile</a>
								<a href="#!"><i className="fas fa-lock"></i>Change Password</a>
								<a href="#!" onClick={e => logoutPatientNow(e)}><i className="fas fa-sign-out-alt"></i>Logout</a>
						</div>
					</div>
				</ul>
				)
		}
	}

	const loaded = loadingAdmin && loadingDoctor && loadingPatient;

	return (
		<nav className={styles.navbar}>
			<Link to="/" className={styles.navbarHeader}>
				<i className="fas fa-h-square"></i>
				HMS
			</Link>
			{!loaded && links}
		</nav>
	);
};

const mapStateToProps = state => ({
	loggedAdmin: state.admin.logged,
	loadingAdmin: state.admin.loading,
	loggedDoctor: state.doctor.logged,
	loadingDoctor: state.doctor.loading,
	loggedPatient: state.patient.logged,
	loadingPatient: state.patient.loading,
});

export default connect(mapStateToProps, { logoutAdmin, logoutDoctor, logoutPatient })(withRouter(Navbar));