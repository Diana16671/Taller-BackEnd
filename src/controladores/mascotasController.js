import { mascotas } from "../modelos/mascotaModelo.js";
// Crear un recurso Mascota
const crear = (req, res) => {
    // Validar que el nombre no esté vacío
    if (!req.body.nombre) {
        return res.status(400).json({
            mensaje: 'El nombre no puede estar vacío.'
        });
    }
    
    const database = {
        nombre: req.body.nombre,
        edad: req.body.edad,
        especie: req.body.especie, 
        raza: req.body.raza,
        sexo: req.body.sexo,
        estado: req.body.estado,
        foto: req.body.foto
    };
    // Usar Sequelize para crear el recurso en la BD
    mascotas.create(database)
        .then((resultado) => {
            res.status(201).json({
                mensaje: 'Registro de Mascota Creado con Éxito',
                mascota: resultado
            });
        })
        .catch((err) => {
            res.status(500).json({
                mensaje: `Registro de Mascota No creado ::: ${err}`
            });
        });
};

// Buscar todas las Mascotas
const buscar = (req, res) => {
    // Buscar todas las mascotas registradas
    mascotas.findAll()
        .then((resultado) => {
            res.status(200).json(resultado);
        })
        .catch((err) => {
            res.status(500).json({
                mensaje: `No se encontraron registros ::: ${err}`
            });
        });
};
// Buscar Mascota por ID
const buscarId = (req, res) => {
    const id = req.params.id; 
    
    // Validar que el ID no esté vacío
    if (!id) {
        return res.status(400).json({
            mensaje: 'El id no puede estar vacío'
        });
    }
    // Buscar la mascota por ID
    mascotas.findByPk(id)
        .then((resultado) => {
            if (!resultado) {
                return res.status(404).json({
                    mensaje: 'Mascota no encontrada'
                });
            }
            res.status(200).json(resultado);
        })
        .catch((err) => {
            res.status(500).json({
                mensaje: `Error al buscar mascota ::: ${err}`
            });
        });
};

// Actualizar Mascota
const actualizar = (req, res) => {
    const id = req.params.id;
    
    // Validar que se hayan proporcionado datos para actualizar
    if (!req.body.nombre && !req.body.edad) {
        return res.status(400).json({
            mensaje: 'No se encontraron Datos para Actualizar'
        });
    }

    const updates = {
        nombre: req.body.nombre,
        edad: req.body.edad,
        especie: req.body.especie,
        raza: req.body.raza,
        sexo: req.body.sexo,
        estado: req.body.estado,
        foto: req.body.foto
    };

    // Actualizar la mascota en la BD
    mascotas.update(updates, { where: { id } })
        .then((resultado) => {
            if (resultado[0] === 0) { // Verifica si se actualizó alguna fila
                return res.status(404).json({
                    mensaje: 'Mascota no encontrada o no se realizaron cambios'
                });
            }
            res.status(200).json({
                tipo: 'success',
                mensaje: 'Registro Actualizado'
            });
        })
        .catch((err) => {
            res.status(500).json({
                tipo: 'error',
                mensaje: `Error al actualizar Registro ::: ${err}`
            });
        });

};
// Eliminar Mascota
const eliminar = (req, res) => {
    const id = req.params.id;
    // Validar que el ID no esté vacío
    if (!id) {
        return res.status(400).json({
            mensaje: 'El id es requerido para eliminar una mascota'
        });
    }
    // Eliminar la mascota en la BD
    mascotas.destroy({ where: { id } })
        .then((resultado) => {
            if (resultado === 0) {
                return res.status(404).json({
                    mensaje: 'Mascota no encontrada'
                });
            }
            res.status(200).json({
                tipo: 'success',
                mensaje: 'Mascota eliminada con éxito'
            });
        })
        .catch((err) => {
            res.status(500).json({
                tipo: 'error',
                mensaje: `Error al eliminar la mascota ::: ${err}`
            });
        });
};

// Exportar los métodos del controlador
export { crear, buscar, buscarId, actualizar, eliminar };

