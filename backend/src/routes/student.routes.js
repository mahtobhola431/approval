const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const session = require("../middleware/session");
const db = require("../config/db");

router.use(auth, role("STUDENT"), session);

router.get("/profile", async (req, res) => {
  const [rows] = await db.query(
    "SELECT id,name,email,role FROM users WHERE id=?",
    [req.user.id]
  );
  res.json(rows[0]);
});

module.exports = router;
