const crypto = require("crypto");
const db = require("../config/db");

module.exports = async (req, res, next) => {
  const hash = crypto
    .createHash("sha256")
    .update(req.token)
    .digest("hex");

  const [rows] = await db.query(
    "SELECT * FROM user_sessions WHERE user_id=? AND jwt_token_hash=? AND is_active=1",
    [req.user.id, hash]
  );

  if (rows.length === 0) {
    return res.status(401).json({ message: "Session expired" });
  }

  next();
};
