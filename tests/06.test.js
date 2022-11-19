/// ========================================================================== ///
/// ============================= HENRY-COMMERCE ============================= ///
/// ================================== TESTS ================================= ///

const utils = require('../utils');
const getBrandPrices = require('../controllers/06-controller');
const expect = require('chai').expect;

describe('---------- `getBrandSales` ----------', function () {
   beforeEach(function () {
      utils.reset();
   });

   it('Debe retornar el precio total de los coches que pertenecen a la marca', function () {
      const totalPrice = Math.ceil(Math.random() * 1000);
      const brand = utils.generateBrand();
      const cars = [
         utils.generateCar(),
         utils.generateCar(),
         utils.generateCar(),
         utils.generateCar(),
         utils.generateCar(),
      ];
      cars.forEach((c) => (c.price = totalPrice / 5));
      brand.cars.push(cars[0].id);
      brand.cars.push(cars[1].id);
      brand.cars.push(cars[2].id);
      brand.cars.push(cars[3].id);
      brand.cars.push(cars[4].id);
      utils.testBrands().push(brand);
      utils.testCars().push(cars[0]);
      utils.testCars().push(cars[1]);
      utils.testCars().push(cars[2]);
      utils.testCars().push(cars[3]);
      utils.testCars().push(cars[4]);
      utils.testCars().unshift(utils.generateCar());
      utils.testCars().unshift(utils.generateCar());
      utils.testCars().push(utils.generateCar());
      utils.testCars().push(utils.generateCar());
      expect(getBrandPrices(brand.name, null)).to.eql(totalPrice);
   });

   it('Debe retornar sólo el total de los coches nuevos si recibe el parámetro "unused" en true', () => {
      const totalPrice = Math.ceil(Math.random() * 1000);
      const brand = utils.generateBrand();
      const cars = [
         utils.generateCar(),
         utils.generateCar(),
         utils.generateCar(),
         utils.generateCar(),
      ];
      cars.forEach((c) => {
         c.price = totalPrice / 4;
         c.new = true;
      });
      brand.cars.push(cars[0].id);
      brand.cars.push(cars[1].id);
      brand.cars.push(cars[2].id);
      brand.cars.push(cars[3].id);
      utils.testBrands().push(brand);
      utils.testCars().push(cars[0]);
      utils.testCars().push(cars[1]);
      utils.testCars().push(cars[2]);
      utils.testCars().push(cars[3]);
      utils.testCars().unshift(utils.generateCar());
      utils.testCars().unshift(utils.generateCar());
      utils.testCars().push(utils.generateCar());
      utils.testCars().push(utils.generateCar());
      utils.testBrands().push(utils.generateBrand());
      const index = Math.floor(Math.random() * cars.length);
      cars[index].new = false;
      expect(getBrandPrices(brand.name, true)).to.eql(
         totalPrice - cars[index].price
      );
   });

   it('Debe retornar sólo el total de los coches usados si recibe el parámetro "unused" en false', () => {
      const totalPrice = Math.ceil(Math.random() * 1000);
      const brand = utils.generateBrand();
      const cars = [
         utils.generateCar(),
         utils.generateCar(),
         utils.generateCar(),
         utils.generateCar(),
      ];
      cars.forEach((c) => {
         c.price = totalPrice / 4;
         c.new = false;
      });
      brand.cars.push(cars[0].id);
      brand.cars.push(cars[1].id);
      brand.cars.push(cars[2].id);
      brand.cars.push(cars[3].id);
      utils.testBrands().push(brand);
      utils.testCars().push(cars[0]);
      utils.testCars().push(cars[1]);
      utils.testCars().push(cars[2]);
      utils.testCars().push(cars[3]);
      utils.testCars().unshift(utils.generateCar());
      utils.testCars().unshift(utils.generateCar());
      utils.testCars().push(utils.generateCar());
      utils.testCars().push(utils.generateCar());
      utils.testBrands().push(utils.generateBrand());
      const index = Math.floor(Math.random() * cars.length);
      cars[index].new = true;
      expect(getBrandPrices(brand.name, false)).to.eql(
         totalPrice - cars[index].price
      );
   });

   it('Debe arrojar un error si la marca no existe', () => {
      const brand = utils.generateBrand();
      expect(() => getBrandPrices(brand.name)).to.throw('Marca no encontrada');
   });
});
