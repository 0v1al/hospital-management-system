import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { loadAdmin, addSpecialization, loadSpecializations } from "../../actions/admin";
import Spinner from "../../Layout/Spinner/Spinner";

import styles from "./DoctorSpecialization.module.css";

const DoctorSpecialization = ({ loadAdmin, addSpecialization, loadSpecializations, specializations, specializationsLoading, alerts }) => {
  const [input, setInput] = useState({
    doctorSpecialization: ""
  });

  const { doctorSpecialization } = input;

  useEffect(() => {
    const fetch = async () => {
      loadAdmin();
      loadSpecializations();
    };
    fetch();
  });

  const addSpecializationSubmit = async e => {
    e.preventDefault();
    addSpecialization(doctorSpecialization);
  };

  return (
    <div className="universalContainer">
      <h2 className="universalTitle">Admin | Doctor Specialization</h2>
      <form className={styles.formDoctorSpecialization} onSubmit={e => addSpecializationSubmit(e)}>
       {alerts.length > 0 && <div className="alerts">{alerts.map(alert => 
            <span key={alert.id} className={`alert alert-${alert.type}`}>{alert.msg}</span>
          )} 
          </div>
        }
        <input type="text" className="universalInput" placeholder="Add doctor specialization..." name="doctorSpecialization" value={doctorSpecialization} onChange={e => setInput({ ... input, [e.target.name]: e.target.value }) }/>
        <input type="submit" value="Add" className={styles.btnDoctorSpecialization}/>
      </form>
      <div className={styles.containerTable}>
        <h3 className={styles.descDoctorSpecialization}>Doctor Specializations</h3>
        <table className={styles.tableDoctorSpecialization}>
          <thead>
            <tr className={styles.tableDoctorSpecializationRow}>
              <th>#</th>
              <th>Specialization</th>
              <th>Creation Date</th>
              <th>Update Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {!specializationsLoading ? (specializations.map((specialization, index) => 
             (<tr className={styles.tableDoctorSpecializationRow}>
                <td>{index + 1}</td>
                <td>{specialization.specialization}</td>
                <td>{specialization.creationDate}</td>
                <td>{specialization.updateDate}</td>
                <td>
                  <span className={styles.editDoctorSpecialization}>
                    <i className="fas fa-edit"></i> {"| "}
                  </span>
                  <span className={styles.removeDoctorSpecialization}>
                    <i className="fas fa-trash"></i>
                  </span>
                </td>
              </tr>
             ))) : (<Spinner />)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  alerts: state.alert,
  specializations: state.specialization.specializations,
  specializationsLoading: state.specialization.loading
});

export default connect(mapStateToProps, { loadAdmin, addSpecialization, loadSpecializations })(DoctorSpecialization);