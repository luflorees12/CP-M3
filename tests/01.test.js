/// ========================================================================== ///
/// ============================= HENRY-books ============================= ///
/// ================================== TESTS ================================= ///

const addCars = require('../controllers/01-controller');
const utils = require('../utils');
const expect = require('chai').expect;

describe('---------- `addCar` ----------', function () {
   const cars = utils.generateCar();
   const cars2 = utils.generateCar();
   const brand = utils.generateBrand();
   beforeEach(function () {
      utils.reset();
   });

   it('Busca el coche en la base de datos. Si está, devuelve un error que diga: "Este coche ya existe en la base de datos"', function () {
      utils.cars.push(cars, cars2);
      expect(() => addCars(cars2)).to.throw(
         'Este coche ya existe en la base de datos'
      );
      expect(utils.cars).to.have.length(2);
   });

   it('Busca la marca en la base de datos. Si ya existe, arroja un error que diga: "Esta marca ya existe en la base de datos"', function () {
      utils.brands.push(brand, utils.generateBrand());
      expect(() => addCars(cars2, brand)).to.throw(
         'Esta marca ya existe en la base de datos'
      );
      expect(utils.brands).to.have.length(2);
   });

   it('Debe agregar un coche a la base de datos (utils.cars) y a su marca correspondiente (brand)', function () {
      addCars(cars, brand);
      expect(utils.cars).to.eql([cars]);
      expect(utils.cars).to.have.length(1);
   });

   it('Debe agregar una nueva marca a la base de datos (utils.brands)', () => {
      const brand2 = utils.generateBrand()
      utils.brands.push(brand2);
      addCars(cars, brand);
      expect(utils.brands).to.eql([brand2, brand]);
   });
});
