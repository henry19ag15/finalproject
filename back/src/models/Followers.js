const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "follower",
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
