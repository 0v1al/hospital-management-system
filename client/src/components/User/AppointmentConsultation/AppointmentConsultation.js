import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { loadUser, addAppointmentConsultation } from "../../actions/user";
import { loadUsersData, loadDoctorsData, loadSpecializationsData } from "../../actions/data";
import { addNotificationDoctorByEmail } from "../../actions/notification";

import styles from "./AppointmentConsultation.module.css";
import stylesLoginAdmin from "../../Admin/LoginAdmin/LoginAdmin.module.css";

const AppointmentConsultation = ({
	 loadUser, 
	 loadUsersData, 
	 loadDoctorsData, 
	 loadSpecializationsData, 
	 addAppointmentConsultation, 
	 addNotificationDoctorByEmail,
	 userFirstName,
	 userLastName,
	 doctors, 
	 specializations, 
	 userEmail, 
	 alerts, 
	 loading 
	}) => {
	const [specialization, setSpecialization] = useState("");
	const [doctor, setDoctor] = useState("");
	const [consultationPrice, setConsultationPrice] = useState("");
	const [input, setInput] = useState({
		specializationSelect: "",
		doctorSelect: "",
		consultationDate: "",
		consultationTime: ""
	});
	const { consultationDate, consultationTime, doctorSelect, specializationSelect } = input;

	useEffect(() => {
		const fetch = async () => {
			loadUser();
			loadUsersData();
			loadDoctorsData();
			loadSpecializationsData();
		};
		fetch();
	}, [loadUser, loadUsersData, loadDoctorsData, loadSpecializationsData]);
	
	useEffect(() => {
		setInput({ ...input, doctorSelect: doctor });
		if (doctors) {
			let doctorByEmail = doctors.filter(doc => doc.email === doctor)[0];
			if (doctorByEmail) {
				const doctorConsultationPrice = doctorByEmail.consultationPrice;
				setConsultationPrice(doctorConsultationPrice);
			}
		}
	}, [doctor]);

	useEffect(() => {
		setInput({ ...input, specializationSelect: specialization });
	}, [specialization])

	const addConsultationNow = async e => {
		e.preventDefault();
		const body = { doctorEmail: doctor, userEmail, consultationDate, consultationTime, doctorSelect, specializationSelect  };
		if (addAppointmentConsultation(body)) {
			addNotificationDoctorByEmail(doctor, `${userFirstName} ${userLastName} sended a consultation request to you`);
		} 
	};

	return (
		<div className="universalContainer">
			<h1 className="universalTitle">Appointment Consultation</h1>
			<form className="universalForm" onSubmit={e => addConsultationNow(e)}>
			<h3 className={["universalDesc", styles.formDesc].join(" ")}>
				<i class="fas fa-calendar-alt"></i>
				Schedule a Consultation Now
			</h3>
				{alerts.length > 0 && 
					<div className="alerts">
						{alerts.map(alert => 
							<span key={alert.id} className={`alert alert-${alert.type}`}>{alert.msg}</span>
						)} 
					</div>
				} 
				<div className={stylesLoginAdmin.inputGroup}>
						<label>* Doctor Specialization:</label>
						<div className={[stylesLoginAdmin.inputRegister].join(" ")}>
							<select onChange={e => setSpecialization(e.target.value)}>
								<option value={null}>Select Doctor Specialization</option>
								{!loading && specializations.length > 0 && specializations.map((specialization, index) => 
									<option key={index} value={specialization.specialization}>
										{`${specialization.specialization[0].toUpperCase()}${specialization.specialization.slice(1)}`}
									</option>)}
							</select>
						</div>
				</div>
				<div className={stylesLoginAdmin.inputGroup}>
						<label>* Doctors:</label>
						<div className={[stylesLoginAdmin.inputRegister].join(" ")}>
							<select onChange={e => setDoctor(e.target.value)}>
								<option value={null}>Select Doctor</option>
								{!loading && doctors.length > 0 && doctors.map((doctor, index) => {
									if (doctor.specialization === specialization) {
										return (
															<option key={index} value={doctor.email}>{
																`${doctor.firstname[0].toUpperCase()}${doctor.firstname.slice(1)} 
																${doctor.lastname[0].toUpperCase()}${doctor.lastname.slice(1)}`}
															</option>
														);
									}
								})}
							</select>
						</div>
				</div>
				<div className={stylesLoginAdmin.inputGroup}>
						<label>Consultacion Price:</label>
						<div className={[stylesLoginAdmin.inputRegister, stylesLoginAdmin.dollarIcon].join(" ")}>
							<input type="text" placeholder="" name="consultationPrice" value={consultationPrice ? consultationPrice : ""} disabled/>
						</div>
				</div>
				<div className={stylesLoginAdmin.inputGroup}>
						<label>* Date:</label>
						<div className={[stylesLoginAdmin.inputRegister].join(" ")}>
							<input type="date" name="consultationDate" value={consultationDate} onChange={e => setInput({ ...input, [e.target.name]: e.target.value }) }/>
						</div>
				</div>
				<div className={stylesLoginAdmin.inputGroup}>
						<label>* Time:</label>
						<div className={[stylesLoginAdmin.inputRegister].join(" ")}>
							<input type="time" name="consultationTime" value={consultationTime} onChange={e => setInput({ ...input, [e.target.name]: e.target.value }) }/>
						</div>
						<span>[* = required]</span>
				</div>
				<input className="universalBtnForm" type="submit" values="submit"/>
			</form>
		</div>
	);
};

const mapStateToProps = state => ({
	doctors: state.data.doctors,
	specializations: state.data.specializations,
	loading: state.data.loading,
	userEmail: state.user.email,
	alerts: state.alert,
	userFirstName: state.user.firstname,
	userLastName: state.user.lastname
});

export default connect(mapStateToProps, { 
	loadUser, 
	loadUsersData, 
	loadDoctorsData, 
	loadSpecializationsData, 
	addAppointmentConsultation,
	addNotificationDoctorByEmail 
})(AppointmentConsultation);