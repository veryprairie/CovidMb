const mongoose = require("mongoose");

const stealSchema = new mongoose.Schema({
    theft: {type: String},
    thiefID: {type: String},
    amount: {type: Number},
    theftTimer: {type: Number},
    target: {type: String},
    resolved: {type: Boolean},

})

const modelSteal = mongoose.model("StealModel", stealSchema);

module.exports = modelSteal;