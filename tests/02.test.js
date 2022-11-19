/// ========================================================================== ///
/// ============================= HENRY-BOOKS ============================= ///
/// ================================== TESTS ================================= ///

const listCars = require('../controllers/02-controller');
const utils = require('../utils');
const expect = require('chai').expect;

describe('---------- `listCars` ----------', function () {
   const cars = utils.generateCar();
   const cars2 = utils.generateCar();

   beforeEach(function () {
      utils.reset();
   });

   it('Devuelve un arreglo con los coches del color especificado en la prop <color>', function () {
      cars.color = 'red';
      utils.cars.push(cars, cars2);
      expect(listCars('red')).to.eql([cars]);
   });
   it('Si no hay coches relacionados, devuelve un error que diga: "No hay coches con ese color en la base de datos"', function () {
      utils.cars.push(cars, cars2);
      expect(() => listCars('celeste')).to.throw(
         'No hay coches con ese color en la base de datos'
      );
   });
});
