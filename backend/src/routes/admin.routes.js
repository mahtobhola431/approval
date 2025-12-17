
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const session = require("../middleware/session");
const db = require("../config/db");

// ✅ IMPORTANT: session added
router.use(auth, session, role("ADMIN"));

router.get("/faculty/pending", async (req, res) => {
  const [rows] = await db.query(
    "SELECT id,name,email FROM users WHERE role='FACULTY' AND is_approved=0"
  );
  res.json(rows);
});

router.put("/faculty/:id/approve", async (req, res) => {
  await db.query(
    "UPDATE users SET is_approved=1 WHERE id=?",
    [req.params.id]
  );

  res.json({ message: "Faculty approved" });
});

router.get("/users", async (req, res) => {
  const [rows] = await db.query(
    "SELECT id,name,email,role,is_approved FROM users"
  );
  res.json(rows);
});

module.exports = router;
