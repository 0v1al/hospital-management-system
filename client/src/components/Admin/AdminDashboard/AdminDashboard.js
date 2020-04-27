import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadAdmin, loadEntityNumber } from "../../actions/admin"; 
import Spinner from "../../Layout/Spinner/Spinner";
import styles from "./AdminDashboard.module.css";

const AdminDashboard = ({ loadAdmin, loadEntityNumber, entityNumber, loading }) => {
  useEffect(() => {
    const fetch = async () => {
      loadAdmin();
      loadEntityNumber();
    };
    fetch();
  }, [loadAdmin, loadEntityNumber])

  return (
    <div className={styles.adminDashboardContainer}>
      <h1 className={styles.titleAdminDashboard}>admin | dashboard</h1>
      {!loading && !!entityNumber ? (
        <div className={styles.adminDashboardCards}>
          <div className={styles.adminDashboardCard}>
            <span className={styles.adminDashboardCardIcon}>
              <i className="fas fa-users"></i>
            </span>
            <h3 className={styles.adminDashboardCardTitle}>Manage Users</h3>
            <p className={styles.adminDashboardCardDesc}>
              Total User: <span>{entityNumber.usersNumber}</span>
            </p>
          </div>
          <div className={styles.adminDashboardCard}>
            <span className={styles.adminDashboardCardIcon}>
              <i className="fas fa-user-md"></i>
            </span>
            <h3 className={styles.adminDashboardCardTitle}>Manage Doctors</h3>
            <p className={styles.adminDashboardCardDesc}>
              Total Doctors: <span>{entityNumber.doctorsNumber}</span>
            </p>
          </div>
          <div className={styles.adminDashboardCard}>
            <span className={styles.adminDashboardCardIcon}>
              <i className="fas fa-edit"></i>
            </span>
            <h3 className={styles.adminDashboardCardTitle}>Consultations</h3>
            <p className={styles.adminDashboardCardDesc}>
              Total Consultations: <span>{entityNumber.consultationsNumber}</span>
            </p>
          </div>
          <div className={styles.adminDashboardCard}>
            <span className={styles.adminDashboardCardIcon}>
              <i className="fas fa-user-injured"></i>
            </span>
            <h3 className={styles.adminDashboardCardTitle}>Manage Patients</h3>
            <p className={styles.adminDashboardCardDesc}>
              Total Patients: <span>{entityNumber.patientsNumber}</span>
            </p>
          </div>
          <div className={styles.adminDashboardCard}>
            <span className={styles.adminDashboardCardIcon}>
              <i className="fas fa-file-alt"></i>
            </span>
            <h3 className={styles.adminDashboardCardTitle}>New Messages</h3>
            <p className={styles.adminDashboardCardDesc}>
              Total New Messages: <span>{entityNumber.messagesNumber}</span>
            </p>
          </div>
        </div>
      ) : (<Spinner/>)}
    </div>
  );  
};

const mapStateToProps = state => ({
  loading: state.admin.loading,
  entityNumber: state.admin.entityNumber
});

export default connect(mapStateToProps, { loadAdmin, loadEntityNumber })(AdminDashboard);