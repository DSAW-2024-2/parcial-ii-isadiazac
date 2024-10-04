const express = require("express");
const { Router } = require("express");
const router = Router();
router.use(express.json());
let verifyToken = require("../Middleware/verifyLogin");

router.get("/weather", verifyToken, (req, res) => {
  const { latitud, longitud } = req.query;

  if (!latitud || !longitud) {
    return res
      .status(400)
      .json({ message: "Se deben ingresar parámetros de latitud y longitud" });
  }

  try {
    url =
      "https://api.open-meteo.com/v1/forecast?latitude=" +
      latitud +
      "&longitude=" +
      longitud +
      "&current_weather=true";
    const response = fetch(url);

    response
      .then((datos) => datos.json())
      .then((ans) =>
        res.json(
          "La temperatura es " + ans.current_weather.temperature + " grados"
        )
      );
  } catch (error) {
    res.status(500).json({
      message: "Hubo un error al obtener los datos del clima",
      error: error.message,
    });
  }
});

module.exports = router;
