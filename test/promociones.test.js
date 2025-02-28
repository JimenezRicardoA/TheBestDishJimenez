const { OrderModel } = require('../models/order.model');
const { DishModel } = require('../models/dishes.model');
const { type } = require('mocha/lib/utils');

const { getdescuento } = require('../controllers/order.controller');

const hamburguesa = new DishModel({
    dishName: 'Hamburguesa',
    dishDescription: 'Hamburguesa de res con queso',
    price: 15,
    type: 'Comida'
});

const picza = new DishModel({
    dishName: 'Picza',
    dishDescription: 'Picza de peperoni',
    price: 18,
    type: 'Comida'
});

const tacos = new DishModel({
    dishName: 'Tacos',
    dishDescription: 'tacos al pastor',
    price: 60,
    type: 'Comida'
});

const coca_cola = new DishModel({
    dishName: 'Coca Cola',
    dishDescription: 'Refresco de cola',
    price: 20,
    type: 'Bebida'
});

const agua = new DishModel({
    dishName: 'Agua',
    dishDescription: 'Agua purificada',
    price: 10,
    type: 'Bebida'
});

const cerveza = new DishModel({
    dishName: 'Cerveza',
    dishDescription: 'Cerveza de barril',
    price: 30,
    type: 'Bebida'
});

const invalido = new DishModel({
    dishName: 12,
    dishDescription: NaN,
    price: 0,
    type: NaN
});

const plato = new DishModel({
    dishName: 'chicles',
    dishDescription: NaN,
    price: 5,
    type: 'Dulces'
});

const plato2 = new DishModel({
    dishName: 'chicles',
    dishDescription: NaN,
    price: {},
    type: 'Comida'
});

const order = new OrderModel({
    clientName: 'Dariel',
    dishes: [
        { dishName: picza.dishName, dishDescription: picza.dishDescription, price: picza.price, type: picza.type },
        { dishName: coca_cola.dishName, dishDescription: coca_cola.dishDescription, price: coca_cola.price, type: coca_cola.type },
        { dishName: hamburguesa.dishName, dishDescription: hamburguesa.dishDescription, price: hamburguesa.price, type: hamburguesa.type },
        { dishName: cerveza.dishName, dishDescription: cerveza.dishDescription, price: cerveza.price, type: cerveza.type },
        { dishName: hamburguesa.dishName, dishDescription: hamburguesa.dishDescription, price: hamburguesa.price, type: hamburguesa.type },
        { dishName: agua.dishName, dishDescription: agua.dishDescription, price: agua.price, type: agua.type },
        { dishName: hamburguesa.dishName, dishDescription: hamburguesa.dishDescription, price: hamburguesa.price, type: hamburguesa.type },
    ],
    total: picza.price + coca_cola.price + hamburguesa.price + cerveza.price + hamburguesa.price + agua.price + hamburguesa.price
})

const order2 = new OrderModel({
    clientName: 'Jasso',
    dishes: [
        { dishName: picza.dishName, dishDescription: picza.dishDescription, price: picza.price, type: picza.type },
        { dishName: coca_cola.dishName, dishDescription: coca_cola.dishDescription, price: coca_cola.price, type: coca_cola.type },
        { dishName: hamburguesa.dishName, dishDescription: hamburguesa.dishDescription, price: hamburguesa.price, type: hamburguesa.type },
        { dishName: coca_cola.dishName, dishDescription: coca_cola.dishDescription, price: coca_cola.price, type: coca_cola.type },
        { dishName: tacos.dishName, dishDescription: tacos.dishDescription, price: tacos.price, type: tacos.type },
        { dishName: agua.dishName, dishDescription: agua.dishDescription, price: agua.price, type: agua.type }
    ],
    total: picza.price + coca_cola.price + hamburguesa.price + coca_cola.price + tacos.price + agua.price
})

const order3 = new OrderModel({
    clientName: 'Juvey',
    dishes: [
        { dishName: picza.dishName, dishDescription: picza.dishDescription, price: picza.price, type: picza.type },
        { dishName: picza.dishName, dishDescription: picza.dishDescription, price: picza.price, type: picza.type },
        { dishName: picza.dishName, dishDescription: picza.dishDescription, price: picza.price, type: picza.type },
        { dishName: coca_cola.dishName, dishDescription: coca_cola.dishDescription, price: coca_cola.price, type: coca_cola.type },
        { dishName: hamburguesa.dishName, dishDescription: hamburguesa.dishDescription, price: hamburguesa.price, type: hamburguesa.type },
        { dishName: hamburguesa.dishName, dishDescription: hamburguesa.dishDescription, price: hamburguesa.price, type: hamburguesa.type },
        { dishName: hamburguesa.dishName, dishDescription: hamburguesa.dishDescription, price: hamburguesa.price, type: hamburguesa.type },
        { dishName: coca_cola.dishName, dishDescription: coca_cola.dishDescription, price: coca_cola.price, type: coca_cola.type },
        { dishName: tacos.dishName, dishDescription: tacos.dishDescription, price: tacos.price, type: tacos.type },
        { dishName: agua.dishName, dishDescription: agua.dishDescription, price: agua.price, type: agua.type }
    ],
    total: picza.price + picza.price + picza.price + coca_cola.price + hamburguesa.price + hamburguesa.price + hamburguesa.price + coca_cola.price + tacos.price + agua.price
})


const order4 = new OrderModel({
    clientName: 'Ricardo',
    dishes: [
        { dishName: picza.dishName, dishDescription: picza.dishDescription, price: picza.price, type: picza.type },
        { dishName: coca_cola.dishName, dishDescription: coca_cola.dishDescription, price: coca_cola.price, type: coca_cola.type },
        { dishName: hamburguesa.dishName, dishDescription: hamburguesa.dishDescription, price: hamburguesa.price, type: hamburguesa.type },
        { dishName: cerveza.dishName, dishDescription: cerveza.dishDescription, price: cerveza.price, type: cerveza.type },
        { dishName: tacos.dishName, dishDescription: tacos.dishDescription, price: tacos.price, type: tacos.type },
        { dishName: agua.dishName, dishDescription: agua.dishDescription, price: agua.price, type: agua.type }
    ],
    total: picza.price + coca_cola.price + hamburguesa.price + cerveza.price + tacos.price + agua.price
})

const order5 = new OrderModel({
    clientName: 'Rogelio',
    dishes: [],
    total: picza.price + coca_cola.price + hamburguesa.price + cerveza.price + tacos.price + agua.price
})

const order6 = new OrderModel({
    clientName: 'Angelica',
    dishes: [invalido.dishName, invalido.dishDescription, invalido.price, invalido.type],
    total: picza.price
})

const order7 = new OrderModel({
    clientName: 'Angelica',
    dishes: [
        { dishName: picza.dishName, dishDescription: picza.dishDescription, price: picza.price, type: picza.type }
    ],
    total: picza.price
})

const order8 = new OrderModel({
    clientName: 'Angelica',
    dishes: [
        { dishName: plato.dishName, dishDescription: plato.dishDescription, price: plato.price, type: plato.type }
    ],
    total: picza.price
})

const order9 = new OrderModel({
    clientName: 'Natalia',
    dishes: [
        { dishName: picza.dishName, dishDescription: picza.dishDescription, price: picza.price, type: picza.type },
    ],
    total: 'tonto'
})

const order10 = new OrderModel({
    clientName: 'Natalia',
    dishes: [
        { dishName: plato2.dishName, dishDescription: plato2.dishDescription, price: plato2.price, type: plato2.type }
    ],
    total: picza.price
});



describe('Pruebas unitarias', () => {
    describe('Dado que se desea recibir el descuento de la orden', () => {
        it('Se espera que devuelva el descuento merecido si se encuentran tres veces el mismo platillo', function () {
            let result = getdescuento(order);
            expect(result).toEqual({
                totalConDescuento: 108,
                totalSinDescuento: 123,
            });
        });

        it('Se espera que devuelva el descuento merecido si se encuentran dos veces la misma bebida', function () {
            let result = getdescuento(order2);
            expect(result).toEqual({
                totalConDescuento: 133,
                totalSinDescuento: 143,
            });
        });

        it('Se espera que devuelva el descuento merecido si se encuentran tres veces la misma bebida', function () {
            let result = getdescuento(order3);
            expect(result).toEqual({
                totalConDescuento: 191,
                totalSinDescuento: 209,
            });
        });

        describe('Dado que se desea cachar los errores dentro de la funcion getdescuento', () => {
            it('Se deberia devolver un error si falta algun parametro dentro de la orden', function () {
                expect(() => getdescuento(order5)).toThrow('Invalid order');
            });

            it('Debe devolver un error si el platillo no es valido', function () {
                expect(() => getdescuento(order6)).toThrow('Invalid order');
            });

            it('Debe devolver un error si se agrega un codigo de promocion en una orden que ya tiene un descuento', function () {
                expect(() => getdescuento(order, 'BIENVENIDA')).toThrow('El codigo no es valido ya que la orden ya cuenta con descuentos');
            });

            it('Debe devolver un error si el codigo de promocion no es valido', function () {
                expect(() => getdescuento(order4, 'INVALIDO')).toThrow('El codigo no es valido');
            });

            it('Debe devolver un error si el platillo cuenta con un type diferente a Comida o Bebida', function () {
                expect(() => getdescuento(order8)).toThrow('Invalid dish type ' + plato.dishName);
            });

            it('Debe devolver un error si la orden cuenta con un total diferente a un numero', function () {
                expect(() => getdescuento(order9)).toThrow('Invalid total');
            });

            it('Debe devolver un error si el platillo cuenta con un price diferente a un numero', function () {
                expect(() => getdescuento(order10)).toThrow('Invalid dish price ' + plato2.dishName);
            });
        })
    });

    describe('Dado que se desea recibir el codigo promocional a utilizar', () => {
        it('Se espera que devuelva un descuento del 30% en la orden en caso de que el codigo sea BIENVENIDA', function () {
            let result = getdescuento(order4, 'BIENVENIDA');
            expect(result).toEqual({
                totalConDescuento: 107.1,
                totalSinDescuento: 153,
            });
        });

        it('Se espera que devuelva el descuento de la bebida mas cara en caso de que el codigo sea REFRESCANTE', function () {
            let result = getdescuento(order4, 'REFRESCANTE');
            expect(result).toEqual({
                totalConDescuento: 123,
                totalSinDescuento: 153,
            });
        });

        it('Se espera que devuelva el descuento de la comida y la bebida mas barata en caso de que el codigo sea COMBO', function () {
            let result = getdescuento(order4, 'COMBO');
            expect(result).toEqual({
                totalConDescuento: 128,
                totalSinDescuento: 153,
            });
        });

        it('Se espera que devuelva el descuento de las dos comidas y bebidas mas caras en caso de que el codigo sea PAREJA', function () {
            let result = getdescuento(order4, 'PAREJA');
            expect(result).toEqual({
                totalConDescuento: 25,
                totalSinDescuento: 153,
            });
        });

        describe('Dado que se desea cachar los errores dentro de los codigos promocionales', () => {
            it('Debe devolver un error si el codigo utilizado es REFRESCANTE y la orden no cuenta con bebidas', function () {
                expect(() => getdescuento(order7, 'REFRESCANTE')).toThrow('No hay bebidas en la orden');
            });

            it('Debe devolver el descuento de la comida y la bebida mas cara, en caso de no haber mas de una de cada una y el codigo sea PAREJA', function () {
                let result = getdescuento(order7, 'PAREJA');
                expect(result).toEqual({
                    totalConDescuento: 0,
                    totalSinDescuento: 18,
                });
            });

            it('Debe devolver un descuento ya sea en la comida o en la bebida, en caso de que alguno de los dos no exista y se utilice el codigo COMBO', function () {
                let result = getdescuento(order7, 'COMBO');
                expect(result).toEqual({
                    totalConDescuento: 0,
                    totalSinDescuento: 18,
                });
            });
        });
    });
})