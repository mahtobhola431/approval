const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const db = require("../config/db");

router.use(auth, role("ADMIN"));

router.get("/faculty/pending", async (req, res) => {
  const [rows] = await db.query(
    "SELECT * FROM users WHERE role='FACULTY' AND is_approved=0"
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

module.exports = router;
