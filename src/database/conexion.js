import Sequelize from 'sequelize';

const db = new Sequelize("EmAdopcion_Mascotas","mascotasdi","mascotas2024", {  // nos conectamos con Sequelize
    dialect: "mysql",  // motor BD
    host: "localhost",  // dirección IP
    port: 3307
   
});

export { db };

