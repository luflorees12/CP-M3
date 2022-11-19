const supertest = require('supertest-as-promised')(require('../app'));
const utils = require('../utils');
const expect = require('chai').expect;

describe('PUT /cars', function () {
   beforeEach(function () {
      utils.reset();
   });

   it('PUT responde con un mensaje que indica que el coche fue actualizado correctamente', function () {
      const car1 = utils.generateBrand();
      utils.brands.push(car1);
      car1.cars.push(utils.generateCar());

      const car = {
         id: car1.cars[0].id,
         model: car1.cars[0].model,
         price: '300.000',
         new: true,
         color: car1.cars[0].color,
         electric: false,
      };

      return supertest
         .put('/cars')
         .send({ car })
         .expect(200)
         .expect('Content-Type', /json/)
         .expect(function (res) {
            expect(res.body).to.eql({
               message: 'Coche actualizado correctamente',
            });
         });
   });

   it('PUT responde el mensaje de error en caso de que no encuentre el coche', function () {
      const car1 = utils.generateBrand();
      utils.brands.push(car1);
      car1.cars.push(utils.generateCar());
      const car = {
         id: 90,
         model: car1.cars[0].model,
         price: '80.000',
         new: true,
         color: car1.cars[0].color,
         electric: false,
      };
      return supertest
         .put('/cars')
         .send({ car })
         .expect(400)
         .expect('Content-Type', /json/)
         .expect(function (res) {
            expect(res.body).to.eql({
               error: 'No se encontro el coche solicitado',
            });
         });
   });

   it('PUT responde el mensaje de error en caso de que reciba algún valor undefined', function () {
      const car1 = utils.generateBrand();
      utils.brands.push(car1);
      car1.cars.push(utils.generateCar());
      const car = {
         id: car1.cars[0].id,
         model: car1.cars[0].model,
         price: '80.000',
         new: undefined,
         color: car1.cars[0].color,
         electric: undefined,
      };
      return supertest
         .put('/cars')
         .send({ car })
         .expect(400)
         .expect('Content-Type', /json/)
         .expect(function (res) {
            expect(res.body).to.eql({
               error: 'Faltan datos a completar',
            });
         });
   });
});
