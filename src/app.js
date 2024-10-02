import express from 'express';
import { routerMascotas } from "./rutas/mascotasRouter.js";
import { db } from "./database/conexion.js";
import cors from "cors";
// Crear instancia de Express
const app = express();
//Cors
app.use(cors());
// Middleware para parsear JSON
app.use(express.json());

// Verificar conexión con la base de datos
db.authenticate().then(() => {
    console.log('Conexión a la base de datos correcta');
}).catch(err => {
    console.log(`Conexión a la base de datos incorrecta: ${err}`);
});

// Definir la ruta principal
app.get('/', (req, res) => {
    res.send('Hola, Bienvenido al Sitio Principal');
});

// Llamar rutas de mascotas
app.use("/mascotas", routerMascotas);

// --Middleware para manejo de errores global--
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({
        mensaje: 'Ocurrió un error en el servidor',
        error: err.message
    });
});

// Definir el puerto del servidor
const PORT = 4000;

// Sincronizar la base de datos y abrir el servidor
db.sync({ alter: true  }).then(() => { // force: false para no borrar los datos en cada sincronización
    app.listen(PORT, () => {
        console.log(`Servidor inicializado en el puerto ${PORT}`);
    });
}).catch(err => {
    console.log(`Error al sincronizar base de datos: ${err}`);
});

