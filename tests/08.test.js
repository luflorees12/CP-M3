/// ========================================================================== ///
/// ============================= HENRY-cars ============================= ///
/// ================================== TESTS ================================= ///

const utils = require('../utils');
const supertest = require('supertest-as-promised')(require('../app'));
const expect = require('chai').expect;

describe('---------- `getCars` ----------', function () {
   const cars = utils.generateCar();
   const cars2 = utils.generateCar();

   beforeEach(function () {
      utils.reset();
   });
   it('Si no hay autos con el color seleccionado por el cliente, arroja un error', function () {
      utils.cars.push(cars, cars2);
      return supertest
         .get('/cars')
         .send({ color: 'verde' })
         .expect(400)
         .expect(function (res) {
            expect(res.body).to.eql({
               err: 'No hay coches con ese color en la base de datos',
            });
         });
   });

   it('Devuelve los autos del color seleccionado por el cliente', function () {
      cars.color = 'red';
      cars2.color = 'red';
      utils.cars.push(cars, cars2);
      return supertest
         .get('/cars')
         .send({ color: 'red' })
         .expect(200)
         .expect('Content-Type', /json/)
         .expect(function (res) {
            expect(res.body).to.eql([cars, cars2]);
         });
   });
});
