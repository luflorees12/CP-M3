const supertest = require('supertest-as-promised')(require('../app'));
const utils = require('../utils');
const expect = require('chai').expect;

describe('POST /cars', function () {
   const cars = utils.generateCar();
   const cars2 = utils.generateCar();
   const brands = utils.generateBrand();
   beforeEach(function () {
      utils.reset();
   });
   it('POST si el coche ya existe, responde con el error correspondiente', function () {
      utils.cars.push(cars, cars2);
      return supertest
         .post('/cars')
         .send({ cars: cars2 })
         .expect(400)
         .expect('Content-Type', /json/)
         .expect(function (res) {
            expect(res.body).to.eql({
               err: 'Este coche ya existe en la base de datos',
            });
         });
   });

   it('POST responde con un status 201 y el coche creado', function () {
      return supertest
         .post('/cars')
         .send({ cars: cars, brand: brands })
         .expect(201)
         .expect('Content-Type', /json/)
         .expect(function (res) {
            expect(res.body).to.eql({ msg: [cars] });
            expect(utils.cars).to.have.length(1);
         });
   });

   it('POST Si ya existe la marca, responde con un error y status 400', function () {
      utils.brands.push(brands, utils.generateBrand());
      return supertest
         .post('/cars')
         .send({ cars: cars2, brand: brands })
         .expect(400)
         .expect('Content-Type', /json/)
         .expect(function (res) {
            expect(res.body).to.eql({
               err: 'Esta marca ya existe en la base de datos',
            });
         });
   });
   it('POST agrega una nueva marca y responde con un status 201', () => {
      return supertest
         .post('/cars')
         .send({ cars: cars, brand: brands })
         .expect(201)
         .expect('Content-Type', /json/)
         .expect(function (res) {
            expect(utils.brands).to.have.length(1);
            expect(utils.brands).to.eql([{...brands, cars: [cars.id]}])
         });
   });
});
