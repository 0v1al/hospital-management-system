import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadDoctor } from "../../actions/doctor";

import { Link } from "react-router-dom";

import styles from "../../Admin/AdminDashboard/AdminDashboard.module.css";

const DoctorDashboard = ({ loadDoctor, doctorId }) => {
  
  useEffect(() => {
    const fetch = async () => {
      loadDoctor();
    }

    fetch();
  }, [loadDoctor])

  return (
    <div className="universalContainer">
      <h1 className={styles.titleAdminDashboard}>doctor | dashboard</h1>
      <div className={[styles.adminDashboardCards, styles.doctorCards].join(" ")}>
        <div className={styles.adminDashboardCard}>
          <span className={styles.adminDashboardCardIcon}>
            <i className="fas fa-user"></i>
          </span>
          <h3 className={styles.adminDashboardCardTitle}>My Profile</h3>
          <Link to="/doctor-update-profile" className={styles.adminDashboardCardDescLink}>Update Profile</Link>
        </div>
        <div className={styles.adminDashboardCard}>
          <span className={styles.adminDashboardCardIcon}>
            <i className="fas fa-clipboard-list"></i>
          </span>
          <h3 className={styles.adminDashboardCardTitle}>My Consultation</h3>
          <Link to="/doctor-appointment-history" className={styles.adminDashboardCardDescLink}>View Consultations History</Link>
        </div>
      </div>
    </div>
  );  
};

export default connect(null, { loadDoctor })(DoctorDashboard);