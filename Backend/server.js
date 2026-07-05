// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Medicine Reminder Backend Running");
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const medicineRoutes = require("./routes/medicineRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

dotenv.config();

const connectDB = require("./config/db");

connectDB();

const app = express();

//app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:8080",
//     credentials: true,
//   })
// );
app.use(
  cors({
    origin: [
      "http://localhost:8080",
      "https://medi-minder-frontend.kaustav709.workers.dev",
    ],
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Medicine Reminder Backend Running");
});

const PORT = process.env.PORT || 5000;

const authRoutes = require("./routes/authRoutes");

const notificationRoutes =
  require("./routes/notificationRoutes");


app.use("/api/auth", authRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use(
  "/api/notifications",
  notificationRoutes
);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});