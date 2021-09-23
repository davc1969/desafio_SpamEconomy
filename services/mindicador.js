// Importar librería Axios para leer el API de los indicadores económicos
const axios = require("axios");

const url_base = "https://mindicador.cl/api/";

const  indicadores = async () => {
    let indicadoresFinal;

    // primero, crear un arreglo conlos indicadores que necesitamos leer
    inds = ["dolar", "euro", "uf", "utm"];

    // Se crea un nuevo arreglo con promesas, mapenado el arreglo anterior
    const indicadoresPromises = inds.map( async (indicador) => {
        //console.log("--", indicador);
        return await axios.get(`${url_base}${indicador}`)
    });

    //console.log("arreglo de promesas", indicadoresPromises);

    //Ahora hay que resolver todas esas promesas
    Promise.all(indicadoresPromises)
        .then( (response) => {
            indicadoresFinal = response.map(elem => {
                return {
                    indicador: elem.data.codigo,
                    valor: elem.data.serie[0].valor
                }
            })
            console.log("----datos--- ", indicadoresFinal);

            return JSON.stringify(indicadoresFinal)
        })
      
        .catch ( (error) => {
            console.log("Something went wrong...");
            console.log(error);
        })
        .finally ( () => {

            //console.log("indicadores en mindicador 3", typeof indicadoresFinal, indicadoresFinal);
        })


}


// hay que borrar lo anterior
function consultaIndicadores2() {
    return new Promise ( (resolve, reject) => {

        inds = ["dolar", "euro", "uf", "utm"];

        // Se crea un nuevo arreglo con promesas, mapenado el arreglo anterior
        const indicadoresPromises = inds.map( async (indicador) => {
            return await axios.get(`${url_base}${indicador}`)
        });

        Promise.all(indicadoresPromises)
        .then( (response) => {
            indicadoresFinal = response.map(elem => {
                return {
                    indicador: elem.data.codigo,
                    valor: elem.data.serie[0].valor
                }
            })
            resolve (JSON.stringify(indicadoresFinal))
        })
      
        .catch ( (error) => {
            console.log("Something went wrong...");
            reject(error);
        })
    }) 
}

async function retornaIndicadores() {
    try {
        return await consultaIndicadores2()
    } catch (error) {
        console.log("error en funcion async");
        return 0;
    }
}


module.exports = {
    retornaIndicadores
}