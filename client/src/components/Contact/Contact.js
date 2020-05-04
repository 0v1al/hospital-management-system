import React, { useState } from 'react'
import { connect } from "react-redux";
import { addMessage } from "../actions/message"; 

import styles from "./Contact.module.css";
import stylesLoginAdmin from "../Admin/LoginAdmin/LoginAdmin.module.css";

const Contact = ({ addMessage, alerts }) => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    contact: "",
    message: ""
  });

  const { name, email, contact, message } = input;

  const sendContactMessage = async e => {
    e.preventDefault();
    if (addMessage(input)) {
      setInput({ name: "", email: "", contact: "", message: "" });
    }
  };

  return (
    <div className={styles.landing}>
      <img src={require("../../assets/bg.jpg")} alt="wallpaper" className={styles.background} />
      <div className={styles.contactContainer}>
        <form className="universalForm" onSubmit={e => sendContactMessage(e)}>
          {alerts.length > 0 && 
            <div className="alerts">{alerts.map(alert => 
                <span key={alert.id} className={`alert alert-${alert.type}`}>{alert.msg}</span> 
              )} </div>
          }
          <h2 className={styles.title}>
            <i className="fas fa-address-book"></i>
            Contact Us
          </h2>
          <h3 className="universalDesc universalDescForm">Send a Message to the us</h3>
          <div className={stylesLoginAdmin.inputGroup}>
            <label>* Name:</label>
            <div className={[stylesLoginAdmin.inputRegister, stylesLoginAdmin.userIcon].join(" ")}>
              <input type="text" placeholder="Enter name..." name="name" value={name} onChange={e => setInput({ ...input, [e.target.name]: e.target.value }) }/>
            </div>
          </div>
          <div className={stylesLoginAdmin.inputGroup}>
            <label>* Email:</label>
            <div className={[stylesLoginAdmin.inputRegister, stylesLoginAdmin.emailIcon].join(" ")}>
              <input type="text" placeholder="Enter email..." name="email" value={email} onChange={e => setInput({ ...input, [e.target.name]: e.target.value })}/>
            </div>
          </div>
          <div className={stylesLoginAdmin.inputGroup}>
            <label>* Contact:</label>
            <div className={[stylesLoginAdmin.inputRegister, stylesLoginAdmin.contactIcon].join(" ")}>
              <input type="text" placeholder="Enter contact..." name="contact" value={contact} onChange={e => setInput({ ...input, [e.target.name]: e.target.value }) }/>
            </div>
          </div>
          <div className={stylesLoginAdmin.inputGroup}>
            <label>* Message:</label>
            <div className={[stylesLoginAdmin.inputRegister].join(" ")}>
              <textarea type="text" rows="4" cols="40" placeholder="Enter message..." name="message" value={message} onChange={e => setInput({ ...input, [e.target.name]: e.target.value }) }/>
            </div>
            <span>[* = required]</span>
          </div>
          <input className={["universalBtn", styles.btnSend].join(" ")} type="submit" value="send"/>
        </form>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps, { addMessage })(Contact)
