const { faker } = require('@faker-js/faker');
// ⚠️ NO MODIFICAR ESTE ARCHIVO ⚠️
// Aquí podrás ver las funciones escenciales para resolver este CheckPoint.

module.exports = {
   cars: [],
   brands: [],

   reset: function () {
      this.cars = [];
      this.brands = [];
   },

   testCars: function () {
      return this.cars;
   },
   testBrands: function () {
      return this.brands;
   },
   // Genera un nuevo coche con fakerJs. Si es necesario, se pueden pisar los valores en los test después
   // para forzar ciertos casos.
   generateCar: function () {
      return {
         id: faker.datatype.uuid(),
         model: faker.vehicle.model(),
         price: faker.commerce.price(),
         new: faker.datatype.boolean(),
         color: faker.color.human(),
      };
   },
   // Genera una nueva marca de coche con fakerJs.
   generateBrand: function () {
      return {
         name: faker.vehicle.manufacturer(),
         // Para agregar más coches es necesario hardcodearlos desde el test a utilizar.
         cars: [],
      };
   },
};
