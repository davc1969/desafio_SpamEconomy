// Importar Librería express para crear el servidor
const express = require("express");

// Importar librería para el manejod e las variables de ambiente en el archivo .env
const dotenv = require("dotenv");
dotenv.config();

console.log(process.env.PORT, process.env.SMTP_EMAIL, process.env.SMTP_PASSWORD);

// definir la variable de enrutamiento
const routes = require("./routes/routes.js");

// Definir el puerto para el servidor
const PORT = process.env.PORT || 3000;

// Crear el servidor
const app = express();

// Las rutas se manejaran con archivos específicos 
app.use(routes);


// poner el servidor en modo escucha
app.listen(PORT, () => {
    console.log(`Server up and listening on port ${PORT} - Process: ${process.pid}`);
});