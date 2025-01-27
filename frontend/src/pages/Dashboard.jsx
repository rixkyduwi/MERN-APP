import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../dist/css/Dashboard.css'; // Buat file CSS untuk styling jika diperlukan
import Modal from 'react-modal';
import withAuth from "../hoc/withAuth";
import axios from 'axios';
Modal.setAppElement('#root'); // Tentukan elemen utama untuk modal

const Dashboard = () => {
    const [date, setDate] = useState(new Date());
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [eventDetails, setEventDetails] = useState("");
    const [username, setUsername] = useState("User"); // Ganti dengan nama user dari konteks atau props
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Mengambil nama pengguna dari access token setelah login
        const token = localStorage.getItem('accessToken');
        if (token) {
            try {
                const decoded = JSON.parse(atob(token.split(".")[1]));
                setUsername(decoded.name || "User"); // Periksa nama field yang benar
                setUserId(decoded.userId); // Asumsikan token memiliki field id
            } catch (error) {
                console.error("Error decoding token:", error);
                setUsername("User");
            }
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Lakukan submit data
        console.log({ email, date, description });
        try {
            await axios.post('/data', { email, date, description });
            setModalIsOpen(false);
            window.location.href = '/';
        } catch (error) {
            console.error("Error creating data:", error);
        }
    };

    const handleDateClick = date => {
        setDate(date);
        setModalIsOpen(true);
    };

    const handleDateChange = (e) => {
        // Mengubah format date dari input string ke Date object
        setDate(new Date(e.target.value));
    };

    const handleEventDetailsChange = (e) => {
        setEventDetails(e.target.value);
    };

    const handleLogout = async () => {
        try {
            await axios.delete('http://localhost:5000/logout');
            localStorage.removeItem('accessToken'); // Menghapus token dari localStorage
            window.location.href = '/login'; // Mengarahkan ke halaman login
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <div className="dashboard-container">
            <div className="header">
                <p className='mr-3'>{username}</p>
                <div>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <div className="calendar-container">
                <Calendar onClickDay={handleDateClick} value={date} />
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={customStyles}
            >
                <form onSubmit={handleSubmit} className="modal-form">
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Date</label>
                        <input
                            type="date"
                            value={date.toISOString().substring(0, 10)} // Format date to YYYY-MM-DD
                            onChange={handleDateChange}
                        />
                    </div>
                    <div>
                        <label>Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </Modal>
        </div>
    );
};

const customStyles = {
    content: {
        border: '2px solid black',
        borderRadius: '20px',
        padding: '20px',
        maxWidth: '500px',
        margin: 'auto',
    },
};
const mr_3 = {
    content:{
        margin_right:'3px',
    }
}

export default withAuth(Dashboard);
