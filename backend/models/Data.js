import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
    email: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
});

const Data = mongoose.model('Data', DataSchema);

export default Data;