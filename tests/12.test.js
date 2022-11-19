const supertest = require('supertest-as-promised')(require('../app'));
const utils = require('../utils');
const expect = require('chai').expect;
const { faker } = require('@faker-js/faker');

describe('GET /brands/:brandName/car-prices', function () {
   beforeEach(() => {
      utils.reset();
   });

   it('Responde con el total de los precios de los coches de la marca', function () {
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
      return supertest
         .get(`/brands/${brand.name}/car-prices`)
         .expect(200)
         .expect('Content-Type', /json/)
         .expect((res) => {
            expect(res.body).to.eql({ results: totalPrice });
         });
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
      return supertest
         .get(`/brands/${brand.name}/car-prices?unused=true`)
         .expect(200)
         .expect('Content-Type', /json/)
         .expect((res) => {
            expect(res.body).to.eql({
               results: totalPrice - cars[index].price,
            });
         });
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
      return supertest
         .get(`/brands/${brand.name}/car-prices?unused=false`)
         .expect(200)
         .expect('Content-Type', /json/)
         .expect((res) => {
            expect(res.body).to.eql({
               results: totalPrice - cars[index].price,
            });
         });
   });

   it('Debe responder con un error si la marca no es encontrada', () => {
      const brand = utils.generateBrand();
      return supertest
         .get(`/brands/${brand.name}/car-prices`)
         .expect(404)
         .expect('Content-Type', /json/)
         .expect((res) => {
            expect(res.body).to.eql({ error: 'Marca no encontrada' });
         });
   });

   it('Debe responder con un error si el parámetro query "unused" no es booleano', () => {
      return supertest
         .get(
            `/brands/${
               utils.generateBrand().name
            }/car-prices?unused=${faker.datatype.number()}`
         )
         .expect(400)
         .expect('Content-Type', /json/)
         .expect((res) => {
            expect(res.body).to.eql({
               error: 'El parámetro unused es inválido',
            });
         });
   });
});
