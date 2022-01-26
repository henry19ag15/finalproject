const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {

    sequelize.define('order', {
        status:{  
            type: DataTypes.ENUM('created', 'processing', 'cancelled', 'completed'),
            allowNull: true
        },
        payment_id:{
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true
        },
        payment_status:{
            type: DataTypes.STRING,
            defaultValue: "",
            allowNull: true
        },
        merchant_order_id: {
            type: DataTypes.BIGINT,
            defaultValue: 0,
            allowNull: true
        },
        // approve_Id:{
        //     type:DataTypes.STRING,
        //     allowNull: true

        // }
    });
};
