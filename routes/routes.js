// Importar Librería express para crear el enrutamiento
const express = require("express");

// Importar librería PATH para manejar los directorios
const path = require("path");

// Crear variable de enrutamiento
const router = express.Router();

// IMporta el módulo de correos
const mailer = require("../services/mailer");


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

router.get("/mailing", async (req, res) => {

    console.log(req.query);

    const { correos, asunto, contenido } = req.query;
    res.type('text/html');
    try {
        const mailResponse = await mailer.send(correos.split(","), asunto, contenido);

        res.write("Correos enviados exitosamente...");

    } catch (error) {
        console.log(`Something went wrong\n${error}`);
    }
    res.end("And that finished the mailing system");
})


module.exports = router;