/// ========================================================================== ///
/// ============================= HENRY-CARS ============================= ///
/// ================================== TESTS ================================= ///

const utils = require('../utils');
const updateCar = require('../controllers/03-controller');
const expect = require('chai').expect;
describe('----------`updateCar`----------', function () {
   beforeEach(function () {
      utils.reset();
   });

   it('Debe retornar un error al no encontrar el coche', () => {
      const car1 = utils.generateCar();
      const car2 = utils.generateCar();
      const car3 = utils.generateBrand();
      const car4 = utils.generateBrand();
      utils.cars.push(car1);
      utils.cars.push(car2);
      utils.brands.push(car3);
      car3.cars.push(utils.generateCar().id);
      car3.cars.push(utils.generateCar().id);
      car3.cars.push(utils.generateCar().id);
      utils.brands.push(car4);
      car4.cars.push(utils.generateCar().id);
      let id = Math.ceil(Math.random() * 10);
      expect(() => updateCar(id)).to.throw(
         'No se encontro el coche solicitado'
      );
   });

   it('Debe modificar de forma correcta al coche encontrado dentro de la marca', () => {
      const cars = [utils.generateCar(), utils.generateCar()];
      const car1 = utils.generateBrand();
      const car2 = utils.generateBrand();
      utils.brands.push(car1);
      utils.cars.push(cars[0]);
      car1.cars.push(cars[0].id);
      utils.cars.push(cars[1]);
      utils.brands.push(car2);
      car2.cars.push(cars[1].id);

      const cambios = {
         id: cars[0].id,
         model: cars[0].model,
         price: '20.000',
         new: false,
         color: cars[0].color,
         electric: true,
      };

      const cambios2 = {
         id: cars[1].id,
         model: cars[1].model,
         price: '80.000',
         new: true,
         color: cars[1].color,
         electric: false,
      };

      expect(updateCar(cambios)).to.eql(utils.brands[0].cars[0]);
      expect(utils.cars[0]).to.eql({
         id: cars[0].id,
         model: cars[0].model,
         price: '20.000',
         new: false,
         color: cars[0].color,
         electric: true,
      });
      expect(updateCar(cambios2)).to.eql(utils.brands[1].cars[0]);
      expect(utils.cars[1]).to.eql({
         id: cars[1].id,
         model: cars[1].model,
         price: '80.000',
         new: true,
         color: cars[1].color,
         electric: false,
      });
   });

   it('Si alguno de los datos recibidos es undefined debe retornar un error', () => {
      const cars = [utils.generateCar(), utils.generateCar()];
      const car1 = utils.generateBrand();
      const car2 = utils.generateBrand();
      utils.brands.push(car1);
      utils.cars.push(cars[0]);
      car1.cars.push(cars[0].id);
      utils.cars.push(cars[1]);
      utils.brands.push(car2);
      car2.cars.push(cars[1].id);
      const cambios = {
         id: cars[0].id,
         model: cars[0].model,
         price: '130.000',
         new: true,
         color: cars[0].color,
         electric: undefined,
      };
      const cambios2 = {
         id: cars[1].id,
         model: cars[1].model,
         price: '130.000',
         new: undefined,
         color: cars[1].color,
         electric: false,
      };
      expect(() => updateCar(cambios)).to.throw('Faltan datos a completar');
      expect(() => updateCar(cambios2)).to.throw('Faltan datos a completar');
   });
});
