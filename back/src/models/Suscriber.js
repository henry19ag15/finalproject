const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "suscriber",
    {
     autorId:{
        type: DataTypes.STRING,
        default:[],
        allowNull:true,
      },
     
    }
    // {
    //   timestamps: false,
    // }
  );
};
