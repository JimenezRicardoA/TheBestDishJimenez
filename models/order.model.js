const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    date: { type: Date },
    clientName: {
        type: String,
        required: true
    },
    dishes: [{
        dishName: {
            type: String,
            required: true
        },
        dishDescription: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
            default: 0
        },
        type: {
            type: String,
            required: true
        }
    }],
    total: {
        type: Number,
        required: true,
        default: 0
    }
});

let OrderModel = mongoose.model('Order', orderSchema, 'order');

module.exports = {
    OrderModel
};