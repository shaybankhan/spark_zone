const mysql = require('mysql');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();

app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], allowedHeaders: ['Content-Type', 'Authorization'] }));
app.use(bodyParser.json());

app.listen(3000, (err) => {
    if (err) {
        console.error("❌ Server failed to start:", err);
    } else {
        console.warn("🚀 Server listening on port 3000");
    }
});

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "spark_zone",
    port: 3306
});

conn.connect((err) => {
    if (err) {
        console.error("❌ Database connection failed", err);
    } else {
        console.warn("✅ Database Connected Successfully");
    }
});

// -------------------- SIGNUP --------------------
app.post('/api/signup', (req, res) => {
    const { username, fullname, email, password } = req.body;
    console.log("📥 Signup request received:", req.body);

    const query = "INSERT INTO users (username, fullname, email, password, status) VALUES (?, ?, ?, ?, ?)";
    conn.query(query, [username, fullname, email, password, 'pending'], (err, result) => {
        if (err) {
            console.error("❌ Error inserting user:", err);
            return res.status(500).json({ error: "Internal server error" });
        }

        console.log("✅ User inserted into DB:", result.insertId);

        // generate OTP and send email
        generateOTP(email, res);
    });
});

// -------------------- LOGIN --------------------
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    console.log("📥 Login request received for:", email);

    const query = "SELECT * FROM users WHERE email = ? AND password = ? AND status='verified'";
    conn.query(query, [email, password], (err, result) => {
        if (err) {
            console.error("❌ Error logging in:", err);
            return res.status(500).json({ error: "Internal server error" });
        } else if (result.length === 0) {
            console.warn("⚠️ Invalid login attempt:", email);
            return res.status(401).json({ error: "Invalid email or password" });
        } else {
            console.log("✅ Login successful for:", email);
            return res.status(200).json({ message: "Login successful", user: result[0] });
        }
    });
});

// -------------------- VERIFY OTP --------------------
app.post('/api/verify-otp', (req, res) => {
    const { email, otp } = req.body;
    console.log("📥 Verify OTP request:", email, otp);

    const query = "SELECT * FROM otp WHERE email = ? AND otp = ?";
    conn.query(query, [email, otp], (err, result) => {
        if (err) {
            console.error("❌ Error verifying OTP:", err);
            return res.status(500).json({ error: "Internal server error" });
        } else if (result.length === 0) {
            console.warn("⚠️ Invalid OTP for:", email);
            return res.status(401).json({ error: "Invalid email or OTP" });
        } else {
            const updateQuery = "UPDATE users SET status = 'verified' WHERE email = ?";
            conn.query(updateQuery, [email], (updateErr) => {
                if (updateErr) {
                    console.error("❌ Error updating user status:", updateErr);
                    return res.status(500).json({ error: "Internal server error" });
                } else {
                    console.log("✅ OTP verified, user status updated:", email);
                    return res.status(200).json({ message: "OTP verified successfully" });
                }
            });
        }
    });
});

// -------------------- OTP GENERATION --------------------
function generateOTP(email, res) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("📩 Generated OTP:", otp, "for", email);

    const query = "INSERT INTO otp (email, otp) VALUES (?, ?)";
    conn.query(query, [email, otp], (err, result) => {
        if (err) {
            console.error("❌ Error inserting OTP into DB:", err);
            return res.status(500).json({ error: "Internal server error" });
        }

        console.log("✅ OTP inserted into DB for:", email, "RowID:", result.insertId);
        sendOTPEmail(email, otp);

        return res.status(201).json({ message: "User Registered Successfully. OTP sent successfully" });
    });
}

// -------------------- EMAIL --------------------
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "shaybankhan12345@gmail.com",
        pass: "tqxy lsxb eppf bgyi" // ⚠️ Replace with Gmail App Password
    }
});

function sendOTPEmail(email, otp) {
    const subject = "Your OTP Code";
    const text = `Your OTP code is: ${otp}`;
    console.log("📤 Sending OTP email to:", email, "with OTP:", otp);
    sendEmail(email, subject, text);
}

function sendEmail(to, subject, text) {
    console.log("📧 Preparing email to:", to);
    const mailOptions = {
        from: "shaybankhan12345@gmail.com",
        to: to,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.error("❌ Error sending email:", error);
        }
        console.log("✅ Email sent successfully:", info.response);
    });
}
