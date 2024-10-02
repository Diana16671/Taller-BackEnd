import Sequelize from 'sequelize';
import {db} from "../database/conexion.js"; 

const mascotas = db.define('mascotas', {
    id: {
        type: Sequelize.INTEGER, // tipo entero
        allowNull: false, // no permite nulos
        autoIncrement: true, // es auto incrementable
        primaryKey: true // es la llave primaria
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false // Cambiado a false, ya que el nombre no puede estar vacío
    },
    especie: {
        type: Sequelize.ENUM('perro', 'gato', 'conejo', 'hamster', 'ave', 'pez' ), // Especie con valores limitados
        allowNull: false // No puede estar vacío
    },
    raza: {
        type: Sequelize.STRING,
        allowNull: true // Puede estar vacío
    },
    edad: {
        type: Sequelize.INTEGER,
        allowNull: false // Cambiado a false, ya que la edad es obligatoria
    },
    sexo: {
        type: Sequelize.ENUM('macho', 'hembra'), // Género
        allowNull: true // Puede estar vacío
    },

    estado: {
        type: Sequelize.ENUM('disponible', 'adoptado'), // Estado de la mascota
        defaultValue: 'disponible' // Valor por defecto
    },
    foto: {
        type: Sequelize.STRING,
        allowNull: true // Puede estar vacío
    },
    fecha_registro: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW // Fecha de registro por defecto
    }
});

export { mascotas }; // Exportamos el modelo
