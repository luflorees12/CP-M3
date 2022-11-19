/// ========================================================================== ///
/// ============================= HENRY-COMMERCE ============================= ///
/// ================================== TESTS ================================= ///

const utils = require('../utils');
const getCarsByBrand = require('../controllers/05-controller');
const { util } = require('chai');
const expect = require('chai').expect;

describe('---------- `GetCarsByBrand` ----------', function () {
   beforeEach(function () {
      utils.reset();
   });

   it('Debe retornar los coches según la marca solicitada', function () {
      const brand = utils.generateBrand();
      const cars = [
         utils.generateCar(),
         utils.generateCar(),
         utils.generateCar(),
         utils.generateCar(),
      ];
      utils.testCars().push(cars[0]);
      utils.testCars().push(cars[1]);
      utils.testCars().push(cars[2]);
      utils.testCars().push(cars[3]);
      utils.testCars().unshift(utils.generateCar());
      utils.testCars().unshift(utils.generateCar());
      utils.testCars().push(utils.generateCar());
      utils.testCars().push(utils.generateCar());
      utils.testBrands().push(brand);
      utils.testBrands().push(utils.generateBrand());
      utils.testBrands().push(utils.generateBrand());
      brand.cars.push(cars[1].id);
      expect(getCarsByBrand(brand.name, null)).to.eql([cars[1]]);
      utils.testBrands()[0].cars.push(cars[3].id);
      expect(getCarsByBrand(brand.name, null)).to.eql([cars[1], cars[3]]);
   });

   it('Debe arrojar un error si la marca no existe', function () {
      expect(() => getCarsByBrand(null, null)).to.throw('Marca no encontrada');
      expect(() => getCarsByBrand(utils.generateBrand().name, null)).to.throw(
         'Marca no encontrada'
      );
   });

   it('Debe retornar un string si no se encuentran coches asociados', function () {
      const brand = utils.generateBrand();
      const cars = [
         utils.generateCar(),
         utils.generateCar(),
         utils.generateCar(),
         utils.generateCar(),
      ];
      utils.testCars().push(cars[0]);
      utils.testCars().push(cars[1]);
      utils.testCars().push(cars[2]);
      utils.testCars().push(cars[3]);
      utils.testCars().unshift(utils.generateCar());
      utils.testCars().unshift(utils.generateCar());
      utils.testCars().push(utils.generateCar());
      utils.testCars().push(utils.generateCar());
      utils.testBrands().push(utils.generateBrand());
      utils.testBrands().push(utils.generateBrand());
      utils.testBrands().push(brand);
      expect(getCarsByBrand(brand.name, null)).to.eql(
         'No se encontraron coches'
      );
   });

   it("Debe retornar los coches de mayor a menor si recibe el parametro 'sort' con el valor 'highPrice'", () => {
      const brand = utils.generateBrand();
      const cars = [
         utils.generateCar(),
         utils.generateCar(),
         utils.generateCar(),
         utils.generateCar(),
      ];
      cars.forEach((c, i) => {
         c.price = 10 * i;
      });
      utils.testCars().push(cars[0]);
      utils.testCars().push(cars[3]);
      utils.testCars().push(cars[1]);
      utils.testCars().push(cars[2]);
      utils.testBrands().push(brand);
      utils.testBrands()[0].cars.push(cars[0].id);
      utils.testBrands()[0].cars.push(cars[1].id);
      utils.testBrands()[0].cars.push(cars[2].id);
      utils.testBrands()[0].cars.push(cars[3].id);
      utils.testCars().unshift(utils.generateCar());
      utils.testCars().unshift(utils.generateCar());
      utils.testCars().push(utils.generateCar());
      utils.testCars().push(utils.generateCar());
      utils.testBrands().push(utils.generateBrand());
      utils.testBrands().push(utils.generateBrand());
      expect(getCarsByBrand(brand.name, 'highPrice')).to.eql([
         cars[3],
         cars[2],
         cars[1],
         cars[0],
      ]);
   });

   it("Debe retornar los coches de menor a mayor si recibe el parametro 'sort' con el valor 'lowPrice'", () => {
      const brand = utils.generateBrand();
      const cars = [
         utils.generateCar(),
         utils.generateCar(),
         utils.generateCar(),
         utils.generateCar(),
      ];
      cars.forEach((c, i) => {
         c.price = 10 * i;
      });
      utils.testCars().push(cars[1]);
      utils.testCars().push(cars[3]);
      utils.testCars().push(cars[2]);
      utils.testCars().push(cars[0]);
      utils.testBrands().push(brand);
      utils.testBrands()[0].cars.push(cars[0].id);
      utils.testBrands()[0].cars.push(cars[1].id);
      utils.testBrands()[0].cars.push(cars[2].id);
      utils.testBrands()[0].cars.push(cars[3].id);
      utils.testCars().push(utils.generateCar());
      utils.testCars().push(utils.generateCar());
      utils.testBrands().push(utils.generateBrand());
      utils.testBrands().push(utils.generateBrand());
      expect(getCarsByBrand(brand.name, 'lowPrice')).to.eql([
         cars[0],
         cars[1],
         cars[2],
         cars[3],
      ]);
   });
});
