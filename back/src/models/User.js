const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
        validate:{
          isEmail:true
        }
      },
      username: {
        type: DataTypes.STRING,
        allowNull: true,
      }, // para poder modificar
      profilephoto: {
        type: DataTypes.STRING,
        allowNull: true,
      }, // para poder modificar
      //roles de usuario y administrador
      rol:{
        type:DataTypes.ENUM,
        values:['user', 'admin'],
        defaultValue:'user'
      },
      active:{
        type:DataTypes.BOOLEAN,
        defaultValue:true,
        allowNull:false
      },
      comment:{
        type:DataTypes.STRING,
        defaultValue:"",
        allowNull:true
      },
    }
    // {
    //   timestamps: false,
    // }
  );
};
