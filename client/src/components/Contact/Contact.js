import React from 'react'

import styles from "./Contact.module.css";
import stylesLoginAdmin from "../Admin/LoginAdmin/LoginAdmin.module.css";

const Contact = () => {
  return (
    <div className={styles.landing}>
      <img src={require("../../assets/bg.jpg")} alt="wallpaper" className={styles.background} />
      <div className={styles.contactContainer}>
        <form className="universalForm">
          <h2 className={styles.title}>Contact Us</h2>
          <div className={stylesLoginAdmin.inputGroup}>
            <label>* Name:</label>
            <div className={[stylesLoginAdmin.inputRegister, stylesLoginAdmin.userIcon].join(" ")}>
              <input type="text" placeholder="Enter name..." name="name"/>
            </div>
          </div>
          <div className={stylesLoginAdmin.inputGroup}>
            <label>* Email:</label>
            <div className={[stylesLoginAdmin.inputRegister, stylesLoginAdmin.emailIcon].join(" ")}>
              <input type="text" placeholder="Enter email..." name="email"/>
            </div>
          </div>
          <div className={stylesLoginAdmin.inputGroup}>
            <label>* Contact:</label>
            <div className={[stylesLoginAdmin.inputRegister, stylesLoginAdmin.contactIcon].join(" ")}>
              <input type="text" placeholder="Enter contact..." name="contact"/>
            </div>
          </div>
          <div className={stylesLoginAdmin.inputGroup}>
            <label>* Message:</label>
            <div className={[stylesLoginAdmin.inputRegister].join(" ")}>
              <textarea type="text" rows="4" cols="40" placeholder="Enter message..." name="message"/>
            </div>
            <span>[* = required]</span>
          </div>
          <input className={["universalBtn", styles.btnSend].join(" ")} type="submit" value="send"/>
        </form>
      </div>
    </div>
  )
}

export default Contact
