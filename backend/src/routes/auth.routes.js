const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { comparePassword } = require("../utils/password");
const { generateToken } = require("../utils/jwt");
const crypto = require("crypto");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const [users] = await db.query(
    "SELECT * FROM users WHERE email=?",
    [email]
  );

  if (users.length === 0) {
    return res.status(400).json({ message: "User not found" });
  }

  const user = users[0];

  const isMatch = user.password === password ? true : false;

  if(!isMatch){
    return res.status(400).json({message : "Invalid credentials"});
  }

  // Invalidate old sessions
  await db.query(
    "UPDATE user_sessions SET is_active=0 WHERE user_id=?",
    [user.id]
  );

  const token = generateToken({
    id: user.id,
    role: user.role,
    isApproved: user.is_approved
  });

  const hash = crypto.createHash("sha256").update(token).digest("hex");

  await db.query(
    "INSERT INTO user_sessions (user_id,jwt_token_hash,is_active) VALUES (?,?,1)",
    [user.id, hash]
  );

  res.json({ token , user});
});

router.post("/faculty/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1️⃣ Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required"
      });
    }

    // 2️⃣ Check if user already exists
    const [existingUsers] = await db.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({
        message: "User already exists"
      });
    }


    // 4️⃣ Insert faculty user
    const [result] = await db.query(
      `INSERT INTO users
        (name, email, password, role, is_approved)
       VALUES (?, ?, ?, 'FACULTY', 0)`,
      [name, email, password]
    );

    // 5️⃣ Fetch created user
    const [users] = await db.query(
      `SELECT id, name, email, role, is_approved
       FROM users
       WHERE id = ?`,
      [result.insertId]
    );

    // 6️⃣ Return success
    return res.status(200).json({
      message: "Faculty signup successful. Await admin approval.",
      user: users[0]
    });

  } catch (error) {
    console.error("Faculty signup error:", error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
});







module.exports = router;
