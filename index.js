const {ApolloServer} = require('apollo-server');
const typeDefs =  require('./DB/schema');
const resolvers = require('./DB/resolvers');
const conectarDB = require('./config/db');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: 'config.env'});



conectarDB();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:({req})=>{
        console.log(req.headers['authorization'])

        const token = req.headers['authorization'] || '';

        if(token){
            try{
                const usuario = jwt.verify(token, process.env.SECRETA)
                //console.log(usuario);
                return {
                    usuario
                }
            }catch(error){
                console.log(error);
                console.log('Error con el token')
            }
        }


    }
});

server.listen().then( ({url}) => {
    console.log(`Servidor listo en la URL ${url}`);
})