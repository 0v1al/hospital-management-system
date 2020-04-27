import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { loadAdmin, addSpecialization, loadSpecializations, removeSpecialization, editSpecialization } from "../../actions/admin";
import Spinner from "../../Layout/Spinner/Spinner";
import Moment from "react-moment";

import styles from "./DoctorSpecialization.module.css";

const DoctorSpecialization = ({ loadAdmin, addSpecialization, loadSpecializations, specializations, specializationsLoading, removeSpecialization, editSpecialization, alerts }) => {
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
  }, [loadAdmin, loadSpecializations]);

  const addSpecializationSubmit = async e => {
    e.preventDefault();
    addSpecialization(doctorSpecialization);
  };

  const removeSpecializationSubmit = async e => {
    const specializationName = e.target.parentElement.parentElement.parentElement.getAttribute("data-name-specialization");
    removeSpecialization(specializationName);
  }

  const setInputEditOn = e => {
    const editInput = e.target.parentElement.parentElement.parentElement.childNodes[1].childNodes[0];
    editInput.disabled = !editInput.disabled;
  }

  const editSpecializationInput = async e => {
    const specializationName = e.target.parentElement.parentElement.getAttribute
    ("data-name-specialization");
    const newSpecialization = e.target.value;
    if (e.key === "Enter" || e.key === "Escape") {
        e.target.disabled = true;
        editSpecialization(specializationName, newSpecialization);
    } 
  }

  return (
    <div className="universalContainer">
      <h2 className="universalTitle">Admin | Doctor Specialization</h2>
      <form className={styles.formDoctorSpecialization} onSubmit={e => addSpecializationSubmit(e)}>
        <input type="text" className="universalInput" placeholder="Add doctor specialization..." name="doctorSpecialization" value={doctorSpecialization} onChange={e => setInput({ ... input, [e.target.name]: e.target.value }) }/>
        <input type="submit" value="Add" className={styles.btnDoctorSpecialization}/>
      </form>
      <div className={styles.containerTable}>
        {alerts.length > 0 && 
            <div className="alerts">
              {alerts.map(alert => 
                <span key={alert.id} className={`alert alert-${alert.type}`}>{alert.msg}</span>
                )} 
            </div>
          } 
        <h3 className={styles.descDoctorSpecialization}>Doctor Specializations</h3>
        <table className={styles.tableDoctorSpecialization}>
          <thead>
            <tr className={styles.tableDoctorSpecializationRow}>
              <th>#</th>
              <th>Specialization</th>
              <th>Registration Date</th>
              <th>Update Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {!specializationsLoading ? (specializations.map((specialization, index) => 
             (<tr className={styles.tableDoctorSpecializationRow} key={index} data-name-specialization={specialization.specialization}>
                <td>{index + 1}</td>
                <td>
                  <input className={styles.editSpecialization} placeholder={`${specialization.specialization[0].toUpperCase()}${specialization.specialization.slice(1)}`} onKeyPress={e => editSpecializationInput(e)}  disabled />
                </td>
                <td><Moment format="YYYY-MM-DD/HH:mm">{specialization.creationDate}</Moment></td>
                <td>
                  {
                    specialization.updateDate ? 
                    <Moment format="YYYY-MM-DD">
                      {specialization.updateDate}
                    </Moment> : "---"
                  }
                </td>
                <td>
                  <span className={styles.editDoctorSpecialization} onClick={e => setInputEditOn(e)}>
                    <i className="fas fa-edit"></i> {"| "}
                  </span>
                  <span className={styles.removeDoctorSpecialization} onClick={e => removeSpecializationSubmit(e)}>
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

export default connect(mapStateToProps, { loadAdmin, addSpecialization, loadSpecializations, removeSpecialization, editSpecialization })(DoctorSpecialization);