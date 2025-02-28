const OrderModel = require('../models/order.model').OrderModel;
const { DishModel } = require('../models/dishes.model');

const dic = {
    BIENVENIDA: (total, dishes) => total * 0.7,
    REFRESCANTE: (total, dishes) => {
        let totalBebidas = [];
        dishes.forEach(dish => {

            if (dish.type === 'Bebida') {

                totalBebidas.push({
                    name: dish.dishName,
                    price: dish.price
                });

            }

        });

        if (totalBebidas.length === 0) {
            throw new Error('No hay bebidas en la orden');
        }

        totalBebidas.sort((a, b) => b.price - a.price);
        const descuento = totalBebidas[0].price;

        return total - descuento;
    },
    COMBO: (total, dishes) => {
        let totalBebidas = [];
        let totalComidas = [];
        let descuento = 0;

        dishes.forEach(dish => {

            if (dish.type === 'Bebida') {

                totalBebidas.push({
                    name: dish.dishName,
                    price: dish.price
                });

            } else if (dish.type === 'Comida') {

                totalComidas.push({
                    name: dish.dishName,
                    price: dish.price
                });
            }
        });

        if (totalBebidas.length === 0 && totalComidas.length > 0) {

            totalComidas.sort((a, b) => a.price - b.price);
            descuento = totalComidas[0].price;

            return total - descuento;

        } else if (totalBebidas.length > 0 && totalComidas.length === 0) {

            totalBebidas.sort((a, b) => a.price - b.price);
            descuento = totalBebidas[0].price;

            return total - descuento;

        }

        totalComidas.sort((a, b) => a.price - b.price);
        totalBebidas.sort((a, b) => a.price - b.price);

        descuento = totalComidas[0].price + totalBebidas[0].price;

        return total - descuento;

    },
    PAREJA: (total, dishes) => {
        let totalBebidas = [];
        let totalComidas = [];
        let descuento = 0;

        dishes.forEach(dish => {

            if (dish.type === 'Bebida') {

                totalBebidas.push({
                    name: dish.dishName,
                    price: dish.price
                });

            } else if (dish.type === 'Comida') {

                totalComidas.push({
                    name: dish.dishName,
                    price: dish.price
                });

            }

        });

        if (totalBebidas.length > 0 && totalComidas.length === 0) {

            if (totalbebidas.length < 1) {
                descuento = totalbebidas[0].price;
                return total - descuento;
            } else {

                totalBebidas.sort((a, b) => a.price - b.price);
                descuento = totalBebidas[0].price;

                return total - descuento;

            }

        } else if (totalBebidas.length === 0 && totalComidas.length > 0) {

            if (totalComidas.length < 1) {
                descuento = totalComidas[0].price;
                return total - descuento;
            } else {

                totalComidas.sort((a, b) => a.price - b.price);
                descuento = totalComidas[0].price;

                return total - descuento;

            }

        } else {

            totalComidas.sort((a, b) => b.price - a.price);
            totalBebidas.sort((a, b) => b.price - a.price);



            descuento = totalComidas[0].price + totalComidas[1].price + totalBebidas[0].price + totalBebidas[1].price;

            return total - descuento;

        }

    }
}

function getdescuento(orden, codigo) {

    const foodcount = {};
    const drinkcount = {};
    let fdescuento = 0;
    let ddescuento = 0;
    let foodDiscounts = [];
    let drinkDiscounts = [];
    let total = orden.total;


    if (!orden.clientName || !orden.dishes || orden.dishes.length === 0 || orden.total === undefined) {
        throw new Error('Invalid order');
    } else if (typeof orden.total != 'number' || orden.total <= 0) {
        throw new Error('Invalid total');
    }


    for (const dish of orden.dishes) {

        if (!dish.dishName || dish.price === undefined || !dish.type) {
            throw new Error('Invalid dish');
        } else if (dish.type !== 'Comida' && dish.type !== 'Bebida') {
            throw new Error('Invalid dish type ' + dish.dishName);
        } else if (typeof dish.price != 'number' || dish.price <= 0) {
            throw new Error('Invalid dish price ' + dish.dishName);
        }

        if (dish.type === 'Comida') {
            foodcount[dish.dishName] = (foodcount[dish.dishName] || 0) + 1;
        } else {
            drinkcount[dish.dishName] = (drinkcount[dish.dishName] || 0) + 1;
        }
    }

    for (const dishName in foodcount) {

        if (foodcount[dishName] >= 3) {

            const dish = orden.dishes.find(d => d.dishName === dishName);
            foodDiscounts.push({
                dish: dishName,
                discount: dish.price
            });

        }

    }

    for (const dishName in drinkcount) {

        if (drinkcount[dishName] >= 2) {

            const dish = orden.dishes.find(d => d.dishName === dishName);
            drinkDiscounts.push({
                dish: dishName,
                discount: dish.price
            });

        }

    }

    if (codigo) {

        if (foodDiscounts.length > 0 || drinkDiscounts.length > 0) {
            throw new Error('El codigo no es valido ya que la orden ya cuenta con descuentos');
        }

        if (!dic[codigo]) {
            throw new Error('El codigo no es valido');
        } else {

            let descuento = dic[codigo](orden.total, orden.dishes);

            return {
                totalSinDescuento: total,
                totalConDescuento: descuento
            }
        }

    } else {

        if (foodDiscounts.length > 0) {

            foodDiscounts.sort((a, b) => b.discount - a.discount);
            fdescuento = Math.min(foodDiscounts[0].discount, 20);

        }

        if (drinkDiscounts.length > 0) {

            drinkDiscounts.sort((a, b) => b.discount - a.discount);
            ddescuento = Math.min(drinkDiscounts[0].discount, 10);

        }

        if (fdescuento >= 21) {
            fdescuento = 20;
        }

        if (ddescuento >= 11) {
            ddescuento = 10;
        }

        if (fdescuento > ddescuento) {
            orden.total -= fdescuento;
        } else {
            orden.total -= ddescuento;
        }

        return {

            totalSinDescuento: total,
            totalConDescuento: orden.total

        };
    }

}


module.exports = {
    getdescuento
};