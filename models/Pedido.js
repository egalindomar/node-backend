const mongoose = require("mongoose");

const ProductoSchema = mongoose.Schema({
  pedido: {
    type: Array,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Cliente",
  },
  Vendedor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Usuario",
  },
});

module.exports = mongoose.model("Pedido", ProductoSchema);
