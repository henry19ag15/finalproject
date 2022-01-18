const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "post",
    {
      photo:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      
      detail: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      creator: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      likes: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue:[],
        allowNull: true,
      },
      active:{
        type:DataTypes.BOOLEAN,
        defaultValue:true,
        allowNull:true
      }
    }
    // {
    //   timestamps: false,
    // }
  );
};