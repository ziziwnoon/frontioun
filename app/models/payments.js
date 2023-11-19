const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({

} , {
    timestamps : true
})

module.exports = {
    PaymentModel : mongoose.model("payment" , Schema)
}