const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const approval = require("../middleware/approval");
const db = require("../config/db");
const { hashPassword } = require("../utils/password");

router.use(auth, role("FACULTY"), approval);

router.post("/students", async (req, res) => {
  const { name, email, password } = req.body;


  await db.query(
    `INSERT INTO users
     (name,email,password,role,is_approved,created_by)
     VALUES (?,?,?,?,1,?)`,
    [name, email, hash, "STUDENT", req.user.id]
  );

  res.json({ message: "Student created" });
});

router.get("/students", async (req, res) => {
  const [rows] = await db.query(
    "SELECT * FROM users WHERE role='STUDENT' AND created_by=?",
    [req.user.id]
  );
  res.json(rows);
});

module.exports = router;
