const cursos = [
    {
        titulo: 'AAAAAA',
        tecnologia: 'BBBBBB'
    },
    {
        titulo: 'CCCCCCC',
        tecnologia: 'DDDDDDD'
    },
    {
        titulo: 'EEEEEE',
        tecnologia: 'FFFFFFF'
    }
]

const resolvers = {
    Query:{
        obtenerCursos: (_, {input}, ctx) => {
            console.log(ctx);
            const resultado = cursos.filter(curso => curso.tecnologia === input.tecnologia);
            return resultado;
            },
        obtenerTecnlogia: () => cursos

    }
}

module.exports = resolvers;