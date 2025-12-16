const express = require("express");
const cors = require("cors");
const app = express();
const { PORT } = require("./config/env");

// 🔓 Allow all origins (DEV / INTERVIEW)
app.use(cors());

app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/faculty", require("./routes/faculty.routes"));
app.use("/api/student", require("./routes/student.routes"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
