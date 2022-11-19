/// ========================================================================== ///
/// ============================= HENRY-CARS ============================= ///
/// ================================== TESTS ================================= ///

const utils = require('../utils');
const deleteCar = require('../controllers/04-controller');
const expect = require('chai').expect;
describe('----------`deleteCar`----------', function () {
   beforeEach(function () {
      utils.reset();
   });

   it('Debe retornar un mensaje con un error al no encontrar el coche', () => {
      const car1 = utils.generateCar();

      const car2 = utils.generateCar();

      utils.cars.push(car1);

      utils.cars.push(car2);

      let id = Math.ceil(Math.random() * 10);

      expect(() => deleteCar(id)).to.throw(`No existe el coche con id: ${id}`);
   });

   it('Debe eliminar un coche de forma correcta y responder con el array cars teniendo en cuenta el eliminado', () => {
      const car1 = utils.generateCar();

      const car2 = utils.generateCar();

      const car3 = utils.generateCar();

      utils.cars.push(car1);

      utils.cars.push(car2);

      utils.cars.push(car3);

      expect(deleteCar(car3.id)).not.to.contain(car3);

      expect(utils.cars).to.have.length(2);

      expect(deleteCar(car2.id)).not.to.contain(car2);

      expect(utils.cars).to.have.length(1);
   });
});
