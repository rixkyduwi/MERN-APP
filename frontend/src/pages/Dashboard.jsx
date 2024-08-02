import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Modal from 'react-modal';
import '../dist/css/Dashboard.css'; // Buat file CSS untuk styling jika diperlukan

const Dashboard = () => {
    const [date, setDate] = useState(new Date());
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [eventDetails, setEventDetails] = useState("");
    const [username, setUsername] = useState("User"); // Ganti dengan nama user dari konteks atau props

    const handleDateClick = date => {
        setDate(date);
        setModalIsOpen(true);
    };

    const handleEventDetailsChange = (e) => {
        setEventDetails(e.target.value);
    };

    const handleLogout = () => {
        // Tambahkan logika logout di sini
        console.log("Logout");
    };

    const handleAddEvent = () => {
        // Tambahkan logika untuk menambahkan acara di sini
        console.log("Event added:", eventDetails);
        setModalIsOpen(false);
    };

    return (
        <div className="dashboard-container">
            <div className="header">
                <button className="user-button" onClick={() => setModalIsOpen(true)}>
                    {username}
                </button>
                <div className="dropdown-content">
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <div className="calendar-container">
                <Calendar onClickDay={handleDateClick} />
            </div>
            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <h2>Add Event</h2>
                <p>{`Selected date: ${date.toDateString()}`}</p>
                <input
                    type="text"
                    placeholder="Event details"
                    value={eventDetails}
                    onChange={handleEventDetailsChange}
                />
                <button onClick={handleAddEvent}>Add Event</button>
                <button onClick={() => setModalIsOpen(false)}>Close</button>
            </Modal>
        </div>
    );
};

export default Dashboard;
