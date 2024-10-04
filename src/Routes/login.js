const express = require("express");
const { Router } = require("express");
const router = Router();
router.use(express.json());
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET;

users = {
  email: "admin@admin.com",
  password: "admin",
};

router.post("/login", (req, res) => {
  try {
    const user = req.body.email;
    const password = req.body.password;

    if (user === users.email && password === users.password) {
      const accessToken = jwt.sign(req.body, SECRET_KEY);
      res.json({ accessToken: accessToken });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch {
    res.status(500).json({ message: "Error con el inicio de sesión" });
  }
});

module.exports = router;
