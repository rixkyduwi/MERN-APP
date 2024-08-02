import nodemailer from 'nodemailer';
import Data from '../models/Data.js';

// Get all data
export const getData = async (req, res) => {
    try {
        const data = await Data.find();
        res.json(data);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Create new data
export const createData = async (req, res) => {
    const { email, date, description } = req.body;
    try {
        const newData = new Data({ email, date, description });
        await newData.save();

        // Send email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'rizkydwisaputrar1@gmail.com',
                pass: 'zgaunjbbpxfqmvsm',
            },
        });

        const mailOptions = {
            from: 'rizkydwisaputrar1@gmail.com',
            to: email,
            subject: 'Hi Salam kenal',
            text: 'Hi Salam kenal',
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.json(newData);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Update data by ID
export const updateData = async (req, res) => {
    const { id } = req.params;
    const { email, date, description } = req.body;

    try {
        const updatedData = await Data.findByIdAndUpdate(id, { email, date, description }, { new: true });
        if (!updatedData) {
            return res.status(404).json({ msg: "Data not found" });
        }
        res.json(updatedData);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Delete data by ID
export const deleteData = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedData = await Data.findByIdAndDelete(id);
        if (!deletedData) {
            return res.status(404).json({ msg: "Data not found" });
        }
        res.json({ msg: "Data deleted successfully" });
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Get data by ID
export const getDataById = async (req, res) => {
    const { id } = req.params;

    try {
        const data = await Data.findById(id);
        if (!data) {
            return res.status(404).json({ msg: "Data not found" });
        }
        res.json(data);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Get data by status
export const getDataForStatus = async (req, res) => {
    const { status } = req.params;

    try {
        const data = await Data.find({ status });
        res.json(data);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Get data by user ID
export const getDataByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const data = await Data.find({ userId });
        res.json(data);
    } catch (error) {
        res.status(400).send(error.message);
    }
};
