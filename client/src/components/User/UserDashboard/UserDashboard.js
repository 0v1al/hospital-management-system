import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { loadUser } from "../../actions/user";
import styles from "../../Admin/AdminDashboard/AdminDashboard.module.css";

const UserDashboard = ({ loadUser }) => {
  useEffect(() => {
    const fetch = async () => {
      loadUser();
    }

    fetch();
  }, [loadUser])

  return (
    <div className={styles.adminDashboardContainer}>
      <h1 className={styles.titleAdminDashboard}>patient | dashboard</h1>
      <div className={[styles.patientDashboardCards].join(" ")}>
        <div className={styles.patientDashboardCard}>
          <span className={styles.adminDashboardCardIcon}>
            <i className="fas fa-user"></i>
          </span>
          <h3 className={styles.adminDashboardCardTitle}>My Profile</h3>
          <Link to="/user-update-profile" className={styles.adminDashboardCardDescLink}>Update Profile</Link>
        </div>
        <div className={styles.patientDashboardCard}>
          <span className={styles.adminDashboardCardIcon}>
            <i className="fas fa-clipboard-list"></i>
          </span>
          <h3 className={styles.adminDashboardCardTitle}>My Consultations</h3>
          <Link to="user-appointment-history" className={styles.adminDashboardCardDescLink}>View Consultations History</Link>
        </div>
        <div className={[styles.patientDashboardCard].join(" ")}>
          <span className={styles.adminDashboardCardIcon}>
            <i className="fas fa-book-open"></i>
          </span>
          <h3 className={styles.adminDashboardCardTitle}>Consultations Scheduling</h3>
          <Link to="/user-appointment-consultation" className={styles.adminDashboardCardDescLink}>Send a Consultation</Link>
        </div>
      </div>
    </div>
  );  
};

export default connect(null, { loadUser })(UserDashboard);