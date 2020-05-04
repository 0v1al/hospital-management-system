import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import Moment from "react-moment";

import { loadDoctor, updateProfile } from "../../actions/doctor";
import Spinner from "../../Layout/Spinner/Spinner";

import stylesLoginAdmin from "../../Admin/LoginAdmin/LoginAdmin.module.css";
import styles from "../../Admin/UpdateDoctor/UpdateDoctor.module.css";
import stylesHere from "./UpdateProfile.module.css";

const UpdateProfile = ({ 
  loadDoctor, 
  doctor,
  doctor: { loading },
  doctorEmail,
  updateProfile,
  alerts
}) => {
  const [input, setInput] = useState({
    firstname: "",
    lastname: "",
    address: "",
    email: "",
    consultationPrice: "",
    contact: ""
  });
  const { firstname, lastname, address, email, consultationPrice, contact } = input;

  useEffect(() => {
    const fetch = async () => {
      loadDoctor();
    };
    fetch();
  }, [loadDoctor]);

  useEffect(() => {
    setInput({
      firstname: doctor.firstname,
      lastname: doctor.lastname,
      address: doctor.address,
      email: doctor.email,
      consultationPrice: doctor.consultationPrice,
      contact: doctor.contact
    });
  }, [doctor]);

  const updateDoctorProfileNow = async e => {
    e.preventDefault();
    const body = {
      firstname: firstname,
      lastname: lastname,
      address: address,
      email: email,
      consultationPrice: consultationPrice,
      contact: contact,
      doctorEmail: doctorEmail
    }
    updateProfile(body);
  };

  return (
    <div className="universalContainer">
    <h1 className="universalTitle">Doctor | Edit Profile</h1>
    {!loading ? (
      <>
        <div className={[stylesHere.profileDesc, "universalMt"].join(" ")}>
          <p>Doctor <strong>{`${doctor.firstname} ${doctor.lastname} `}</strong> Profile</p>
          <p>Register Date: <Moment className="bold" format="YYYY-MM-DD">{doctor.date}</Moment></p>
        </div>
        <form className={["universalForm", "universalFormMt"].join(" ")} onSubmit={e => updateDoctorProfileNow(e)}>
          {alerts.length > 0 && 
            <div className="alerts">
              {alerts.map(alert => 
                <span key={alert.id} className={`alert alert-${alert.type}`}>{alert.msg}</span>
              )} 
            </div>
          } 
          <h3 className={["universalDesc universalDescForm"].join(" ")}>
            <i className="fas fa-user-edit"></i>
            Edit Profile
          </h3>
          <div className={stylesLoginAdmin.inputGroup}>
            <label>Firstname:</label>
            <div className={[stylesLoginAdmin.inputRegister, stylesLoginAdmin.doctorIcon].join(" ")}>
              <input type="text" name="firstname" value={firstname} onChange={e => setInput({ ...input, [e.target.name]: e.target.value }) } />
            </div>
          </div>
          <div className={stylesLoginAdmin.inputGroup}>
            <label>Lastname:</label>
            <div className={[stylesLoginAdmin.inputRegister, stylesLoginAdmin.doctorIcon].join(" ")}>
              <input type="text"  name="lastname" value={lastname} onChange={e => setInput({ ...input, [e.target.name]: e.target.value }) }/>
            </div>
          </div>
          <div className={stylesLoginAdmin.inputGroup}>
            <label>Cabinet Adress:</label>
            <div className={[stylesLoginAdmin.inputRegister, stylesLoginAdmin.locationIcon].join(" ")}>
              <input type="text" name="address" value={address} onChange={e => setInput({ ...input, [e.target.name]: e.target.value }) }/>
            </div>
          </div>
          <div className={stylesLoginAdmin.inputGroup}>
            <label>Consultation Price:</label>
            <div className={[stylesLoginAdmin.inputRegister, stylesLoginAdmin.dollarIcon].join(" ")}>
              <input type="text" name="consultationPrice" value={consultationPrice} onChange={e => setInput({ ...input, [e.target.name]: e.target.value }) } />
            </div>
          </div>
          <div className={stylesLoginAdmin.inputGroup}>
            <label>Contact:</label>
            <div className={[stylesLoginAdmin.inputRegister, stylesLoginAdmin.contactIcon].join(" ")}>
              <input type="text" name="contact" value={contact} onChange={e => setInput({ ...input, [e.target.name]: e.target.value }) }/>
            </div>
          </div>
          <div className={stylesLoginAdmin.inputGroup}>
            <label>Email:</label>
            <div className={[stylesLoginAdmin.inputRegister, stylesLoginAdmin.emailIcon].join(" ")}>
              <input type="text" name="email" value={email} onChange={e => setInput({ ...input, [e.target.name]: e.target.value }) }/>
            </div>
            <span>[* = required]</span>
          </div>
          <input type="submit" className={["universalBtn", styles.addBtn].join(" ")}  value="update "/>
        </form>
      </>
    ) : (<Spinner />)}
  </div>
  )
}

const mapstateToProps = state => ({
  alerts: state.alert,
  doctor: state.doctor,
  doctorEmail: state.doctor.email
});

export default connect(mapstateToProps, { loadDoctor, updateProfile })(UpdateProfile);
