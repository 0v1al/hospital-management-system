import React from "react";
import { Link } from "react-router-dom";

import styles from "./Landing.module.css";

const Landing = () => {
  return (
    <>
			<div className={styles.landing}>
				<div className={styles.overlay}></div>
				{/* <img src={require("../../../assets/bg5.jpg")} alt="wallpaper" className={styles.background} /> */}
				<div className={styles.cards}>
					<div className={styles.card}>
						<h3 className={styles.title}>Patients</h3>
						<p className={styles.description}>Register or Login as a Patient</p>
						<div className={styles.facilities}>
							<div className={styles.facilitie}>
								<i class="fas fa-caret-right"></i>
								<p>Facilities that user can do!</p>
							</div>
							<div className={styles.facilitie}>
								<i class="fas fa-caret-right"></i>
								<p>Facilities that user can do!</p>
							</div>
							<div className={styles.facilitie}>
								<i class="fas fa-caret-right"></i>
								<p>Facilities that user can do!</p>
							</div>
							<div className={styles.facilitie}>
								<i class="fas fa-caret-right"></i>
								<p>Facilities that user can do!</p>
							</div>
						</div>
						<Link to="/login-patient" className={styles.link}>Login/Register</Link>
					</div>
					<div className={styles.card}>
						<h3 className={styles.title}>Doctors</h3>
						<p className={styles.description}>Login as a Doctor</p>
						<div className={styles.facilities}>
							<div className={styles.facilitie}>
								<i class="fas fa-caret-right"></i>
								<p>Facilities that user can do!</p>
							</div>
							<div className={styles.facilitie}>
								<i class="fas fa-caret-right"></i>
								<p>Facilities that user can do!</p>
							</div>
							<div className={styles.facilitie}>
								<i class="fas fa-caret-right"></i>
								<p>Facilities that user can do!</p>
							</div>
							<div className={styles.facilitie}>
								<i class="fas fa-caret-right"></i>
								<p>Facilities that user can do!</p>
							</div>
						</div>
						<Link to="/login-doctor" className={styles.link}>Login</Link>
					</div>
					<div className={styles.card}>
						<h3 className={styles.title}>Admin</h3>
						<p className={styles.description}>Login as an Admin</p>
						<div className={styles.facilities}>
							<div className={styles.facilitie}>
								<i class="fas fa-caret-right"></i>
								<p>Facilities that user can do!</p>
							</div>
							<div className={styles.facilitie}>
								<i class="fas fa-caret-right"></i>
								<p>Facilities that user can do!</p>
							</div>
							<div className={styles.facilitie}>
								<i class="fas fa-caret-right"></i>
								<p>Facilities that user can do!</p>
							</div>
							<div className={styles.facilitie}>
								<i class="fas fa-caret-right"></i>
								<p>Facilities that user can do!</p>
							</div>
						</div>
						<Link to="/login-admin" className={styles.link}>Login</Link>
					</div>
				</div>
			</div>
    </>
  );
};

export default Landing;
