import React from "react";

import styles from "../../Admin/AdminDashboard/AdminDashboard.module.css";

const PatientDashboard = () => {
  return (
    <div className={styles.adminDashboardContainer}>
      <h1 className={styles.titleAdminDashboard}>patient | dashboard</h1>
      <div className={[styles.patientDashboardCards].join(" ")}>
        <div className={styles.patientDashboardCard}>
          <span className={styles.adminDashboardCardIcon}>
            <i class="fas fa-user"></i>
          </span>
          <h3 className={styles.adminDashboardCardTitle}>My Profile</h3>
          <p className={styles.adminDashboardCardDesc}>Update Profile</p>
        </div>
        <div className={styles.patientDashboardCard}>
          <span className={styles.adminDashboardCardIcon}>
            <i class="fas fa-clipboard-list"></i>
          </span>
          <h3 className={styles.adminDashboardCardTitle}>My Appointments</h3>
          <p className={styles.adminDashboardCardDesc}>View Appointments History</p>
        </div>
        <div className={[styles.patientDashboardCard].join(" ")}>
          <span className={styles.adminDashboardCardIcon}>
            <i class="fas fa-book-open"></i>
          </span>
          <h3 className={styles.adminDashboardCardTitle}>Book My Appointments</h3>
          <p className={styles.adminDashboardCardDesc}>Book Appointments</p>
        </div>
      </div>
    </div>
  );  
};

export default PatientDashboard;