const supertest = require('supertest-as-promised')(require('../app'));
const utils = require('../utils');
const expect = require('chai').expect;

describe('DELETE /cars', function () {
   beforeEach(function () {
      utils.reset();
   });

   it('DELETE responde con un mensaje que nos indica que el auto fue eliminado correctamente', function () {
      const car1 = utils.generateCar();

      const car2 = utils.generateCar();

      const car3 = utils.generateCar();

      utils.cars.push(car1);

      utils.cars.push(car2);

      utils.cars.push(car3);

      return supertest
         .delete('/cars')
         .send({ id: car1.id })
         .expect(200)
         .expect('Content-Type', /json/)
         .expect(function (res) {
            expect(res.body).to.eql({
               message: `El coche con el id ${car1.id} fue eliminado de forma exitosa`,
            });
         });
   });

   it('DELETE responde el mensaje de error en caso de que no encuentre el coche', function () {
      const car1 = utils.generateCar();

      const car2 = utils.generateCar();

      const car3 = utils.generateCar();

      utils.cars.push(car1);

      utils.cars.push(car2);

      utils.cars.push(car3);

      const id = 90;

      return supertest
         .delete('/cars')
         .send({ id: id })
         .expect(400)
         .expect('Content-Type', /json/)
         .expect(function (res) {
            expect(res.body).to.eql({
               error: `No existe el coche con id: ${id}`,
            });
         });
   });
});
