const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Flask backend via Gunicorn
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

app.get("/", (req, res) => {
  res.render("index", { message: null });
});

app.post("/submit", async (req, res) => {
  try {
    const payload = {
      name: req.body.name,
      email: req.body.email
    };

    const response = await axios.post(
      `${BACKEND_URL}/submit`,
      payload,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    res.render("index", { message: response.data.message });
  } catch (error) {
    console.error("Backend error:", error.message);
    res.render("index", { message: "Error submitting data" });
  }
});

app.listen(3000, () => {
  console.log("Frontend running on port 3000");
});

