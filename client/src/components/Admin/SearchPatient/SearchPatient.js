import React from 'react'

import stylesLoginAdmin from "../LoginAdmin/LoginAdmin.module.css";
import styles from "../Reports/Reports.module.css";

const SearchPatient = () => {
  return (
    <div className="universalContainer">
      <h1 className="universalTitle">Admin | Search Patient</h1>
      <form className={[stylesLoginAdmin.universalForm, styles.form].join(" ")}>
        <h2 className="universalDesc universalDescForm">
          <i className="fas fa-list-alt"></i>
          Search Patient By Email
        </h2>
        <div className={stylesLoginAdmin.inputGroup}>
          <label>* Patient Email:</label>
          <div className={[stylesLoginAdmin.inputRegister].join(" ")}>
            <input type="text" placeholder="Enter email..."/>
          </div>
          <span>[* = required]</span>
        </div>
        <input type="submit" value="search" className="universalBtnForm"/>
      </form>
    </div>
  )
}

export default SearchPatient
