// Importar Librería express para crear el enrutamiento
const express = require("express");

// Importar librería PATH para manejar los directorios
const path = require("path");

// Crear variable de enrutamiento
const router = express.Router();

// IMporta el módulo de correos
const mailer = require("../services/mailer");


async function sendTheMails(req, res, mailMessage) {
    const { correos, asunto, contenido } = req.query;

    console.log("Será que llegamos hasta acá?");
    mailMessage = contenido + mailMessage;
    mailMessage += "datos cortesía de SPAM Economy SPA (envíados por Darío Valenzuela... por fin!!!!)";

    res.type('text/html');
    try {
        const mailResponse = await mailer.send(correos.split(","), asunto, mailMessage);

        res.write("all mails were succesfully sent <br>");

    }  
    catch (error) {
        console.log(`Something went wrong\n${error}`);
    }
    finally {
        res.end("And that finished the mailing operations.");
    }
}

// Se crean las rutas y sus manejadores
router.get("/", (req, res) => {
    // let message = "Nothing to see here" + "<br>";
    // message += "please route yourself to <b>/mailing</b>, there is more interesting stuff there" + "<br>";
    // message += "and just forget that you were here once..." + "<br>" + "<br>";
    // message += "What comes here will be set in the future, please wait! You know that a HTML file will be rendered, so be patient.";
    
    console.log(__dirname);
    res.type('text/html');

    res.sendFile(path.join(__dirname +'/../public/index.html'));
});

router.get("/mailing",  async(req, res) => {

    // antes de enviar correos hay que obtener lso indicadores:

    let arrayIndicators = [];
    const indicadoresFinal = require("../services/mindicador")
    indicadoresFinal.retornaIndicadores()
    .then( (datos) => {
        arrayIndicators = JSON.parse(datos);


        let mailMessage = "";
        console.log("llegamos aqui al menos");
        arrayIndicators.forEach(divisa => {
            console.log(divisa.indicador, divisa.valor);
            mailMessage += `El valor de 1 ${divisa.indicador} el día de hoy es: ${divisa.valor} pesos <br>`
        });
    
        console.log(mailMessage);

        sendTheMails(req, res, mailMessage)

        
    })
    .catch( (error) => {
        console.log("OCurrió un error", error.message);
    });
    
})


module.exports = router;