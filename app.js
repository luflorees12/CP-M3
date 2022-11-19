"use strict";
const express = require("express");
const app = express();
const addCar = require("./routes/08-route");
const getCars = require("./routes/07-route");
const updateBrand = require("./routes/09-route");
const deleteCar = require("./routes/10-route");
const getCarsByBrand = require("./routes/11-route");
const getBrandPrices = require("./routes/12-route");

// Acuérdense de agregar su router o cualquier middleware que necesiten acá.

app.use(express.json());
app.use(addCar);
app.use(getCars);
app.use(updateBrand);
app.use(deleteCar);
app.use(getCarsByBrand);
app.use(getBrandPrices);

module.exports = app;
