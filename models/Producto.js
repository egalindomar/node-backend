const mongoose = require('mongoose');

const ProductoSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true
    }, 
    existencia:{
        type: Number,
        require: true
    },
    precio: {
        type: Number,
        required: true,
        
    },
    creado:{
        type: Date,
        default: Date.now()
    },
    
});

module.exports = mongoose.model('Producto', ProductoSchema);