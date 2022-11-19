const router = require('express').Router();
const updateCar = require('../controllers/03-controller');
/* ⚠️ No modificar nada arriba de esta línea ⚠️

  9️⃣ ***** EJERCICIO 9 ***** - PUT /cars 9️⃣:

  🟢 Integrar la función updateCar que desarrollaste previamente (Ejercicio 3) para obtener los coches.
  📌 Responder con un objeto con una propiedad "message" que se igual al string "Coche actualizado correctamente".
  📌 Si hay un error, responder un objeto con una propiedad "error": <el mensaje recibido en el objeto error>.

    📢 PUNTOS A TENER EN CUENTA 📢
  1) Si algo falla al traer los coches, debes responder con el mensaje del error.
  2) Recibirás los argumentos necesario para ejecutar esa función updateCar mediante la propiedad "body" de *req*.
  3) ¡Revisa en los test el status que deben tener tus respuestas!

*/

// router.put('/cars', (req, res) => {});

//⚠️ No modificar nada debajo de esta línea ⚠️
module.exports = router;
