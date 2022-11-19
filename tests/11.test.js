const supertest = require('supertest-as-promised')(require('../app'));
const utils = require('../utils');
const { faker } = require('@faker-js/faker');
const expect = require('chai').expect;

describe('GET /cars/:brandName', function () {
   beforeEach(function () {
      utils.reset();
   });

   it('Responde con los coches solicitados y la marca solicitada', () => {
      const cars = [
         utils.generateCar(),
         utils.generateCar(),
         utils.generateCar(),
         utils.generateCar(),
      ];
      const brand = utils.generateBrand();
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
      brand.cars.push(cars[3].id);
      return supertest
         .get(`/cars/${brand.name}`)
         .expect(200)
         .expect('Content-Type', /json/)
         .expect(function (res) {
            expect(res.body).to.eql({
               brand: brand.name,
               results: [cars[1], cars[3]],
            });
         });
   });

   it('Responde con un error si no se encontraron coches asociados a la marca', () => {
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
      utils.testBrands().push(brand);
      return supertest
         .get(`/cars/${brand.name}`)
         .expect(400)
         .expect('Content-Type', /json/)
         .expect(function (res) {
            expect(res.body).to.eql({ error: 'No se encontraron coches' });
         });
   });

   it('Responde con un error si la marca no existe', () => {
      return supertest
         .get(`/cars/${utils.generateBrand().name}`)
         .expect(404)
         .expect('Content-Type', /json/)
         .expect(function (res) {
            expect(res.body).to.eql({ error: 'Marca no encontrada' });
         });
   });

   it('Responde con los coches solicitados de mayor a menor cuando el valor de req.query.sort es "highPrice"', () => {
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
      return supertest
         .get(`/cars/${brand.name}?sort=highPrice`)
         .expect(200)
         .expect('Content-Type', /json/)
         .expect(function (res) {
            expect(res.body).to.eql({
               brand: brand.name,
               results: [cars[3], cars[2], cars[1], cars[0]],
            });
         });
   });

   it('Responde con los coches solicitados de menor a mayor cuando el valor de req.query.sort es "lowPrice"', () => {
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
      return supertest
         .get(`/cars/${brand.name}?sort=lowPrice`)
         .expect(200)
         .expect('Content-Type', /json/)
         .expect(function (res) {
            expect(res.body).to.eql({
               brand: brand.name,
               results: [cars[0], cars[1], cars[2], cars[3]],
            });
         });
   });

   it('Responder con un error si req.params.brandName viene como un número', () => {
      return supertest
         .get(`/cars/${faker.datatype.number()}`)
         .expect(400)
         .expect('Content-Type', /json/)
         .expect(function (res) {
            expect(res.body).to.eql({
               error: 'El parámetro brandName es inválido',
            });
         });
   });

   it('Responder con un error si req.query.sort no es válido', () => {
      return supertest
         .get(
            `/cars/${utils.generateBrand().name}?sort=${faker.name.fullName()}`
         )
         .expect(400)
         .expect('Content-Type', /json/)
         .expect(function (res) {
            expect(res.body).to.eql({ error: `El parámetro sort es inválido` });
         });
   });
});
