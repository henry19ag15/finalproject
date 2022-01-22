const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "suscripto",
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
