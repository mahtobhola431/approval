module.exports = (req, res, next) => {
  if (req.user.role === "FACULTY" && !req.user.isApproved) {
    return res.status(403).json({ message: "Faculty not approved" });
  }
  next();
};
