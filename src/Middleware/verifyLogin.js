const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.headers["authorization"].split(" ")[1];
  const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET;

  if (!token) {
    return res
      .status(403)
      .json({ message: "Se requiere un token para acceder a este recurso" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token inválido o vencido" });
    }

    req.user = decoded;
    next();
  });
}

module.exports = verifyToken;
