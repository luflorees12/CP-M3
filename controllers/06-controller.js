const utils = require('../utils');
/* ⚠️ No modificar nada arriba de esta línea ⚠️

  6️⃣ ***** EJERCICIO 6 ***** - getBrandPrices 6️⃣:

   🟢 Debes retornar la suma del precio de todos los coches de la marca recibida por parámetro.
   🟢 Si recibes el parámetro "unused" con valor true, entonces retorna la suma de precios sólo de los coches 
   que sean nuevos.
   🟢 Si recibes el parámetro "unused" con valor false, entonces retorna la suma de precios sólo de los coches 
   que sean usados.
   🟢 Si la marca no existe, arrojar un error que diga: "Marca no encontrada".
      
   📢 PUNTOS A TENER EN CUENTA 📢
   1)El parámetro "unused" puede tener el valor null.
   2) Debes obtener los coches a partir de los IDs almacenados en su marca.
*/

const getBrandPrices = (brand, unused) => {
  let brandIsTrue = utils.brands.find((marca) => marca.name === brand);
  let carIsTrue = utils.cars.filter((auto) => brandIsTrue.cars.includes(auto.id));

  if (!brandIsTrue) throw Error("Marca no encontrada");

  if (unused === true) {
    return carIsTrue.filter((e) => e.new === true).reduce((acc, c) => acc + c.price, 0);
  }

  if (unused === false) {
    return carIsTrue.filter((e) => e.new === false).reduce((acc, c) => acc + c.price, 0);
  }

  return carIsTrue.reduce((acc, c) => acc + c.price, 0);
};

//⚠️ No modificar nada debajo de esta línea ⚠️
module.exports = getBrandPrices;
