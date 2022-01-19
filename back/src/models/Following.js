const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "following",
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