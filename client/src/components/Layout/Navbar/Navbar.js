import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";
import axios from "axios";

import { logoutAdmin } from "../../actions/admin";
import { logoutDoctor } from "../../actions/doctor";
import { logoutUser } from "../../actions/user";
import { 
	loadNotificationsDoctor, 
	loadNotificationsUser, 
	markViewNotificationsUser,
	markViewNotificationsDoctor,
	deleteNotificationsDoctor,
	deleteNotificationsUser
} from "../../actions/notification";
import Spinner from "../Spinner/Spinner";

import styles from "./Navbar.module.css";

const Navbar = ({ 
	loadNotificationsDoctor,
	loadNotificationsUser,
	markViewNotificationsUser,
	markViewNotificationsDoctor,
	doctorNotifications,
	userNotifications,
	loadingNotifications,
	deleteNotificationsUser,
	deleteNotificationsDoctor,
	loggedAdmin, 
	loggedDoctor, 
	loggedUser, 
	logoutAdmin, 
	logoutDoctor, 
	logoutUser, 
	loadingAdmin, 
	loadingDoctor, 
	loadingUser, 
	doctorEmail, 
	userEmail,
	doctorId,
	userId,  
	history 
}) => {
	const [userNotificationsNumber, setUserNotificationsNumber] = useState(0);
	const [doctorNotificationsNumber, setDoctorNotificationsNumber] = useState(0);

	const logoutTimeDoctor = async () => {
		await axios.put(`/logout-doctor${doctorEmail}`);
	};

	const logoutTimeUser = async () => {
		await axios.put(`/logout-user/${userEmail}`);
	};

	useEffect(() => {
		return () => {
			if (loggedDoctor && doctorEmail) {
				logoutTimeDoctor();
			}

			if (loggedUser && userEmail) {
				logoutTimeUser();
			}
		}
	}, []);

  useEffect(() => {
    const fetch = async () => {
      if (doctorId) {
        await loadNotificationsDoctor(doctorId); 
      }
    }
    fetch();
  }, [doctorId, loadNotificationsDoctor]);

    useEffect(() => {
    const fetch = async () => {
      if (userId) {
        await loadNotificationsUser(userId); 
      }
    }
    fetch();
	}, [userId, loadNotificationsUser]);
	
	useEffect(() => {
		const fetch = async () => {
			const notificationsNumber = await axios.get(`/number-user-notifications/${userId}`);
			setUserNotificationsNumber(notificationsNumber.data);
		};
		if (userId && loggedUser) {
			fetch();
		}
	}, [userId, userNotifications]);

	useEffect(() => {
		const fetch = async () => {
			const notificationsNumber = await axios.get(`/number-doctor-notifications/${doctorId}`);
			setDoctorNotificationsNumber(notificationsNumber.data);
		};

		if (doctorId && loggedDoctor) {
			fetch();
		}
	}, [doctorId, doctorNotifications]);

	let links;

	const logoutAdminNow = e => {
		e.preventDefault();
		logoutAdmin(history);
	}

	const logoutDoctorNow = e => {
		e.preventDefault();
		logoutDoctor(history, doctorEmail);
	}

	const logoutUserNow = e => {
		e.preventDefault();
		logoutUser(history, userEmail);
	}

	const markViewNotificationUserNow = async () => {
		await markViewNotificationsUser(userId);
	};

	const markViewNotificationsDoctorNow = async () => {
		await markViewNotificationsDoctor(doctorId);
	}

	const deleteNotificationsDoctorNow = async () => {
		await deleteNotificationsDoctor(doctorId);
	};
	
	const deleteNotificationsUserNow = async () => {
		await deleteNotificationsUser(userId);
	};

	if (!loggedAdmin && !loggedDoctor && !loggedUser) {
		links = (
			<ul className={styles.navbarLinks}>
				<Link to="/contact" className={styles.navbarLink}>Contact</Link>
				<Link to="/login-user" className={styles.navbarLink}>Patients</Link>
				<Link to="/login-doctor" className={styles.navbarLink}>Doctors</Link>
				<Link to="/login-admin" className={styles.navbarLink}>Admin</Link>
			</ul>
			);
	}

	if (loggedAdmin || loggedDoctor || loggedUser) {
		if (loggedAdmin) {
			links = (
			<ul className={styles.navbarLinks}>
				<div className={[styles.navbarLink, styles.navbarSettings].join(" ")}>
					<i className="fas fa-user-circle"></i>
					<div className={styles.navbarSettingsOptions}>
							<Link to="/admin-change-password">
								<i className="fas fa-lock"></i>
								Change Password
							</Link>
							<a href="#!" onClick={e => logoutAdminNow(e)}>
								<i className="fas fa-sign-out-alt"></i>
								Logout
							</a>
					</div>
				</div>
			</ul>
			)
		}
		
		if (loggedDoctor) {
			links = (
				<div className={styles.navbarContainerLinks}>
					<ul className={styles.navbarLinks} onMouseEnter={markViewNotificationsDoctorNow}>
						{doctorNotificationsNumber > 0 && <span className={styles.notificationsNumber}>{doctorNotificationsNumber}</span>}
						<div className={[styles.navbarLink, styles.navbarSettings].join(" ")}>
							<i className="fas fa-bell"></i>
							<div className={[styles.navbarSettingsOptions, styles.navbarSettingsOptionsNotifications].join(" ")}>
								{!loadingNotifications && doctorNotifications.length > 0 && <a className={styles.clear} onClick={deleteNotificationsDoctorNow}>
									<i className="fas fa-trash-alt"></i>
									clear
								</a>}
								{!loadingNotifications ? (
									doctorNotifications.length > 0 ? (
										doctorNotifications.map((notification, index) => (
											<Link to="/doctor-appointment-history" key={index}>
												{notification.message}
												<div>
													-<Moment format="YYYY-MM-DD/HH:mm">{notification.date}</Moment>-
												</div>
											</Link>
										))
									) : (<a className={styles.noNotifications} >no notifications</a>)
								) : (<Spinner />)}
							</div>
						</div>
					</ul>
					<ul className={styles.navbarLinks}>
						<div className={[styles.navbarLink, styles.navbarSettings].join(" ")}>
							<i className="fas fa-user-circle"></i>
							<div className={styles.navbarSettingsOptions}>
								<Link to="/doctor-update-profile"><i className="fas fa-user"></i>My Profile</Link>
								<Link to="/doctor-change-password"><i className="fas fa-lock"></i>Change Password</Link>
								<a href="#!" onClick={e => logoutDoctorNow(e)}><i className="fas fa-sign-out-alt"></i>Logout</a>
							</div>
						</div>
					</ul>
				</div>
			)
		}

		if (loggedUser) {
			links = (
				<div className={styles.navbarContainerLinks}>
					<ul className={styles.navbarLinks} onMouseEnter={markViewNotificationUserNow}>
						{userNotificationsNumber > 0 && <span className={styles.notificationsNumber}>{userNotificationsNumber}</span>}
						<div className={[styles.navbarLink, styles.navbarSettings].join(" ")}>
							<i className="fas fa-bell"></i>
							<div className={[styles.navbarSettingsOptions, styles.navbarSettingsOptionsNotifications].join(" ")}>
								{!loadingNotifications && userNotifications.length > 0 && <a className={styles.clear} onClick={deleteNotificationsUserNow}>
									<i className="fas fa-trash-alt"></i>
									clear
								</a>}
								{!loadingNotifications ? (
									userNotifications.length > 0 ? (
										userNotifications.map((notification, index) => {
											if (notification.message.includes("medical") && notification.message.includes("history")) {
												return (
													<Link to="/user-medical-history" key={index}>
														{notification.message}
														<div>
															-<Moment format="YYYY-MM-DD/HH-mm">{notification.date}</Moment>-
														</div>
													</Link>
												)
											}
											return (
												<Link to="/user-appointment-history" key={index}>
													{notification.message}
													<div>
														-<Moment format="YYYY-MM-DD/HH-mm">{notification.date}</Moment>-
													</div>
												</Link>
										)})		
									) : (<a className={styles.noNotifications} >no notifications</a>)
								) : (<Spinner />)}
							</div>
						</div>
					</ul>
					<ul className={styles.navbarLinks}>
						<div className={[styles.navbarLink, styles.navbarSettings].join(" ")}>
							<i className="fas fa-user-circle"></i>
							<div className={styles.navbarSettingsOptions}>
								<Link to="/user-update-profile">
									<i className="fas fa-user"></i>
									My Profile
								</Link>
								<Link to="/user-change-password">
									<i className="fas fa-lock"></i>
									Change Password
								</Link>
								<a href="#!" onClick={e => logoutUserNow(e)}><i className="fas fa-sign-out-alt"></i>
									Logout
								</a>
							</div>
						</div>
					</ul>
				</div>
			)
		}
	}

	const loaded = loadingAdmin && loadingDoctor && loadingUser;

	return (
		<nav className={styles.navbar}>
			<Link to="/" className={styles.navbarHeader}>
				<i className="fas fa-h-square"></i>
				HMS
			</Link>
			{!loaded ? links : links}
		</nav>
	);
};

const mapStateToProps = state => ({
	loggedAdmin: state.admin.logged,
	loadingAdmin: state.admin.loading,
	loggedDoctor: state.doctor.logged,
	loadingDoctor: state.doctor.loading,
	doctorEmail: state.doctor.email,
	doctorId: state.doctor._id,
	loggedUser: state.user.logged,
	loadingUser: state.user.loading,
	userEmail: state.user.email,
	userId: state.user._id,
	doctorNotifications: state.notification.doctorNotifications,
	userNotifications: state.notification.userNotifications,
	loadingNotifications: state.notification.loading
});

export default connect(mapStateToProps, { 
	logoutAdmin, 
	logoutDoctor, 
	logoutUser, 
	loadNotificationsDoctor,
	loadNotificationsUser,
	markViewNotificationsUser,
	markViewNotificationsDoctor,
	deleteNotificationsDoctor,
	deleteNotificationsUser
})(withRouter(Navbar));