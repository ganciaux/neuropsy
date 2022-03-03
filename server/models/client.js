const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const { isEmail } = require('validator');
const utils = require('../utils/utils');

mongoose.plugin(slug);

const clientSchema = new mongoose.Schema({
    slug: { 
        type: String, 
        slug: ["name", "firstname"], 
        unique: true,
        slugPaddingSize: 3,
    },
    typeId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Type',
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        validate: [isEmail],
        lowercase: true,
        unique: true,
        trim: true,
    },
    address: {
        type: String,
        trim: true,
    },
    city: {
        type: String,
        trim: true,
    },
    zip: {
        type: String,
        trim: true,
    },
    birthdate:{
        type: Date,
        default: Date.now(),
    },
    description: {
        type: String,
        trim: true,
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

clientSchema
.virtual('_name')
.get(function () {
  return `${this.name} ${this.firstname}`;
});

clientSchema
.virtual('_address')
.get(function () {
    return `${this.address} ${this.zip} ${this.city}`;
});

clientSchema
.virtual('_birthdate')
.get(function () {
    return utils.formatDate(this.birthdate);
});

const ClientModel = mongoose.model('Client', clientSchema);

module.exports = ClientModel;