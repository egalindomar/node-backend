const {ApolloServer} = require('apollo-server');
const typeDefs =  require('./DB/schema');
const resolvers = require('./DB/resolvers');
const conectarDB = require('./config/db');


conectarDB();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:()=>{
        const miContext = "Hola";

        return{
            miContext
        }
    }
});

server.listen().then( ({url}) => {
    console.log(`Servidor listo en la URL ${url}`);
})

