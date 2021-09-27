# SPAM Economy spa
## Desafío Latam e-camp: envío de correos masivos y acceso a endpoint API

Este desafío contempla el envío de correos masivos partiendo de una solicitud HTTP.
Se creó un servidor en express que sirve un endpoint donde se lee información de indicadores económicos de un API externo y se genera un correo automáticamente a los recipients indicados en la página html servida al frontend.

Se utilizaron las librerías express, fs, nodemailer y axios para ejecutar todas las tareas.  Se aplicó algo de modularización apra tener un código mas ordenado y limpio.

Para ejecutarlo se deben completar las credenciales para el servicio de correo en el archivo **.env**.

Realizado por *Darío Valenzuela*, septiembre 2021.

