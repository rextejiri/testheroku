const mongoose = require('mongoose');


const productSchema = new mongoose.Schema(
  {
    name: {type: String, required:  true},
    description: String,
    img: String,
    img2: String,
    img3: String,
    img4: String,
    price: {type: Number, min: 0},
    qty: {type: Number, min: 0}
  }
)

const Product = mongoose.model('Fruit', productSchema);

module.exports = Product;
