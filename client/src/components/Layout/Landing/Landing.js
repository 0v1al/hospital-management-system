import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import styles from "./Landing.module.css";

const Landing = ({ loggedAdmin, loggedDoctor, loggedUser }) => {
	if (loggedAdmin || loggedDoctor || loggedUser) {
		if (loggedAdmin) {
				return <Redirect to="/admin-dashboard"/>
		}
		
		if (loggedDoctor) {
			return <Redirect to="/doctor-dashboard"/>
		}
		
		if (loggedUser) {
			return <Redirect to="/user-dashboard"/>
		}
	}

  return (
    <>
			<div className={styles.landing}>
				<img src={require("../../../assets/bg.jpg")} alt="wallpaper" className={styles.background} />
				<h2 className={styles.landingTitle}>Hospital Management System</h2>
				<div className={styles.cards}>
					<div className={styles.card}>
						<h3 className={styles.title}>Patients</h3>
						<p className={styles.description}>Register or Login as a Patient</p>
						<div className={styles.facilities}>
							<div className={styles.facilitie}>
								<i className="fas fa-caret-right"></i>
								<p>Scheduling Consultations</p>
							</div>
							<div className={styles.facilitie}>
								<i className="fas fa-caret-right"></i>
								<p>View Available Doctors</p>
							</div>
							<div className={styles.facilitie}>
								<i className="fas fa-caret-right"></i>
								<p>View Your Medical Details</p>
							</div>
							<div className={styles.facilitie}>
								<i className="fas fa-caret-right"></i>
								<p>Cancel Consultations</p>
							</div>
						</div>
						<Link to="/login-user" className={styles.link}>Login/Register</Link>
					</div>
					<div className={styles.card}>
						<h3 className={styles.title}>Doctors</h3>
						<p className={styles.description}>Login as a Doctor</p>
						<div className={styles.facilities}>
							<div className={styles.facilitie}>
								<i className="fas fa-caret-right"></i>
								<p>Registration/Manage Patients</p>
							</div>
							<div className={styles.facilitie}>
								<i className="fas fa-caret-right"></i>
								<p>View Consultations</p>
							</div>
							<div className={styles.facilitie}>
								<i className="fas fa-caret-right"></i>
								<p>Add Medical History for a Patient</p>
							</div>
							<div className={styles.facilitie}>
								<i className="fas fa-caret-right"></i>
								<p>Search Patients</p>
							</div>
						</div>
						<Link to="/login-doctor" className={styles.link}>Login</Link>
					</div>
					<div className={styles.card}>
						<h3 className={styles.title}>Admin</h3>
						<p className={styles.description}>Login as an Admin</p>
						<div className={styles.facilities}>
							<div className={styles.facilitie}>
								<i className="fas fa-caret-right"></i>
								<p>Registration/Manage Doctors</p>
							</div>
							<div className={styles.facilitie}>
								<i className="fas fa-caret-right"></i>
								<p>View All Consultations</p>
							</div>
							<div className={styles.facilitie}>
								<i className="fas fa-caret-right"></i>
								<p>View Messages Contact</p>
							</div>
							<div className={styles.facilitie}>
								<i className="fas fa-caret-right"></i>
								<p>Search Patients</p>
							</div>
						</div>
						<Link to="/login-admin" className={styles.link}>Login</Link>
					</div>
				</div>
			</div>
    </>
  );
};

const mapStateToProps = state => ({
	loggedAdmin: state.admin.logged,
	loggedDoctor: state.doctor.logged,
	loggedUser: state.user.logged
})

export default connect(mapStateToProps)(Landing);
