import User from '../models/User.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, '_id name email role');
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const allowedUpdates = ["name", "email", "password", "role", "loginTimestamp", "logoutTimestamp", "accessToken"];
    const updateData = {};

    allowedUpdates.forEach((key) => {
      if (data[key] !== undefined) {
        updateData[key] = data[key];
      }
    });

    if (updateData.password) {
      const salt = await bcryptjs.genSalt();
      updateData.password = await bcryptjs.hash(updateData.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json({ msg: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const Register = async (req, res) => {
  const { name, email, password, confPassword, role } = req.body;
  if (password !== confPassword) {
    return res.status(400).json({ msg: "Password dan Konfirmasi Password tidak cocok" });
  }

  const salt = await bcryptjs.genSalt();
  const hashPassword = await bcryptjs.hash(password, salt);

  try {
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role: role || "USER",
    });
    await newUser.save();
    res.json({ msg: "Register Berhasil" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Terjadi kesalahan saat registrasi" });
  }
};

export const Login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ msg: "Email tidak ditemukan" });
    }

    const match = await bcryptjs.compare(req.body.password, user.password);
    if (!match) return res.status(400).json({ msg: "Password salah" });

    const userId = user._id;
    const name = user.name;
    const email = user.email;
    const role = user.role;
    const accessToken = jwt.sign({ userId, name, email, role }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });
    await User.findByIdAndUpdate(userId, { accessToken });

    res.json({ accessToken });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);

  try {
    const user = await User.findOne({ refreshToken });
    if (!user) return res.sendStatus(204);

    await User.findByIdAndUpdate(user._id, { refreshToken: null });
    res.clearCookie("refreshToken");
    return res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
