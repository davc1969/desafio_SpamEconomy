// Importar Librería express para crear el enrutamiento
const express = require("express");

// Crear variable de enrutamiento
const router = express.Router();

// IMporta el módulo de correos
const mailer = require("../services/mailer");


// Se crean las rutas y sus manejadores
router.get("/", (req, res) => {
    let message = "Nothing to see here" + "<br>";
    message += "please route yourself to <b>/mailing</b>, there is more interesting stuff there" + "<br>";
    message += "and just forget that you were here once..." + "<br>" + "<br>";
    message += "What comes here will be set in the future, please wait! You know that a HTML file will be rendered, so be patient.";
    res.type('text/html');
    res.send(message);
});

router.get("/mailing", async (req, res) => {

    const { to, subject, text } = req.query;

    try {
        const mailResponse = await mailer.send(to.split(","), subject, text)
    } catch (error) {
        console.log(`Something went wrong\n${error}`);
    }

    res.type('text/html');
    res.send("And you get to the mailing node...");
})


module.exports = router;