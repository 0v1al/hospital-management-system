import React from "react";

import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {
  return (
    <div className={styles.adminDashboardContainer}>
      <h1 className={styles.titleAdminDashboard}>admin | dashboard</h1>
      <div className={styles.adminDashboardCards}>
        <div className={styles.adminDashboardCard}>
          <span className={styles.adminDashboardCardIcon}>
            <i className="fas fa-users"></i>
          </span>
          <h3 className={styles.adminDashboardCardTitle}>Manage Users</h3>
          <p className={styles.adminDashboardCardDesc}>Total Patients: 4</p>
        </div>
        <div className={styles.adminDashboardCard}>
          <span className={styles.adminDashboardCardIcon}>
            <i className="fas fa-user-md"></i>
          </span>
          <h3 className={styles.adminDashboardCardTitle}>Manage Doctors</h3>
          <p className={styles.adminDashboardCardDesc}>Total Doctors: 8</p>
        </div>
        <div className={styles.adminDashboardCard}>
          <span className={styles.adminDashboardCardIcon}>
            <i className="fas fa-edit"></i>
          </span>
          <h3 className={styles.adminDashboardCardTitle}>Appointments</h3>
          <p className={styles.adminDashboardCardDesc}>Total Appointments: 10</p>
        </div>
        <div className={styles.adminDashboardCard}>
          <span className={styles.adminDashboardCardIcon}>
            <i className="fas fa-user-injured"></i>
          </span>
          <h3 className={styles.adminDashboardCardTitle}>Manage Patients</h3>
          <p className={styles.adminDashboardCardDesc}>Total Patients: 2</p>
        </div>
        <div className={styles.adminDashboardCard}>
          <span className={styles.adminDashboardCardIcon}>
            <i className="fas fa-file-alt"></i>
          </span>
          <h3 className={styles.adminDashboardCardTitle}>New Queries</h3>
          <p className={styles.adminDashboardCardDesc}>Total New Queries: 3</p>
        </div>
      </div>
    </div>
  );  
};

export default AdminDashboard;