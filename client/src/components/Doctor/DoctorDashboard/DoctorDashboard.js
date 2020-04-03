import React from "react";

import styles from "../../Admin/AdminDashboard/AdminDashboard.module.css";

const DoctorDashboard = () => {
  return (
    <div className={styles.adminDashboardContainer}>
      <h1 className={styles.titleAdminDashboard}>doctor | dashboard</h1>
      <div className={[styles.adminDashboardCards, styles.doctorCards].join(" ")}>
        <div className={styles.adminDashboardCard}>
          <span className={styles.adminDashboardCardIcon}>
            <i class="fas fa-user"></i>
          </span>
          <h3 className={styles.adminDashboardCardTitle}>My Profile</h3>
          <p className={styles.adminDashboardCardDesc}>Update Profile</p>
        </div>
        <div className={styles.adminDashboardCard}>
          <span className={styles.adminDashboardCardIcon}>
            <i class="fas fa-clipboard-list"></i>
          </span>
          <h3 className={styles.adminDashboardCardTitle}>My Appointments</h3>
          <p className={styles.adminDashboardCardDesc}>View Appointments History</p>
        </div>
      </div>
    </div>
  );  
};

export default DoctorDashboard;