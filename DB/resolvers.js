const Usuario = require('../models/Usuario');
const Producto = require('../models/Producto');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: 'config.env'});


const crearToken = (usuario, secreta, expiresIn) => {
    console.log(usuario);
    const {id,email,nombre,apellido} = usuario;
    return jwt.sign({id,email,nombre,apellido},secreta,{expiresIn}) 
}


const resolvers = {
    Query:{
        obtenerUsuario: async (_, {token}) => {
            const usuarioId = await jwt.verify(token, process.env.SECRETA )
            return usuarioId
        },
        obtenerProductos: async () => {
            try{
                const productos = await Producto.find({});
                return productos;
            }catch (error){
                console.log(error);
            }
        },
        obtenerProducto: async (_, {id}) =>{
            const producto = await Producto.findById(id);

            if(!producto){
                throw new Error('Producto no encontrado o no existe!')
            }

            return producto;
        }
    },
    Mutation:{
        nuevoUsuario: async (_, {input} ) => {
            const {email, password} = input;

            const existeUsuario = await Usuario.findOne({email});
            
            if(existeUsuario){
                throw new Error ('El usuario ya esta registrado');
            }
            
            const salt = await bcryptjs.genSalt(10);
            console.log(input.password);
            input.password = await bcryptjs.hash(password, salt);


            try{
                const usuario = new Usuario(input);
                usuario.save();
                return usuario;
            }catch (error) {
                console.log(error);
            }
            //console.log(existeUsuario);
        
        },
        autenticarUsuario: async (_, {input}) =>{
            const {email, password} = input;
            const existeUsuario = await Usuario.findOne({email});

            if(!existeUsuario) {
                throw new Error('El usuario no existe :(');
            }

            const passwordCorrecto = await bcryptjs.compare(password, existeUsuario.password);
            
            if(!passwordCorrecto){
                throw new Error ('El Password es incorrecto');
            }
            return{
                token: crearToken(existeUsuario, process.env.SECRETA, '24h')
            }
        },
        nuevoProducto: async(_, {input}) =>{
            try{
                const producto = new Producto(input);
                const resultado = await producto.save();
                return resultado;
            }catch(error){
                console.log(error);
            }
        },
        actualizarProducto: async (_, {id, input}) => {
            let producto = await Producto.findById(id);

            if(!producto){
                throw new Error('Producto no encontrado o no existe!')
            }

            producto = await Producto.findOneAndUpdate({_id : id}, input, {new: true});

            return producto;
        },
        eliminarProducto: async(_, {id}) => {
            let producto = await Producto.findById(id);

            if(!producto){
                throw new Error('Producto no encontrado o no existe!')
            }

            await Producto.findByIdAndRemove({_id: id});

            return "Producto eliminado";
        }

        
    }
}

module.exports = resolvers;