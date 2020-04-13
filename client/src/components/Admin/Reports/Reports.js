import React from 'react'

import styles from "./Reports.module.css";
import stylesLoginAdmin from "../LoginAdmin/LoginAdmin.module.css";

const Reports = () => {
  return (
    <div className="universalContainer">
      <h1 className="universalTitle">Admin | Register Between Dates</h1>
      <form className={[stylesLoginAdmin.universalForm, styles.form].join(" ")}>
        <h2 className="universalDesc universalDescForm">
          <i className="fas fa-list-alt"></i>
          Register Between Dates
        </h2>
        <div className={stylesLoginAdmin.inputGroup}>
          <label>* From Date:</label>
          <div className={[stylesLoginAdmin.inputRegister].join(" ")}>
            <input type="date"/>
          </div>
        </div>
        <div className={stylesLoginAdmin.inputGroup}>
          <label>* To Date:</label>
          <div className={[stylesLoginAdmin.inputRegister].join(" ")}>
            <input type="date"/>
          </div>
          <span>[* = required]</span>
        </div>
        <input type="submit" value="submit" className="universalBtnForm"/>
      </form>
      <div className="universalContainerTable">
        <h3 className="universalDesc universalDescForm">Results Between: </h3>
        <table className="universalTable">
          <thead>
            <tr className="universalTableRow">
              <th>#</th>
              <th>Specialization</th>
              <th>Creation Date</th>
              <th>Update Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Reports
