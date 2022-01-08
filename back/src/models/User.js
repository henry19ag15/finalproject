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
      subscribers: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      subscribed: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      followers: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      following: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      //roles de usuario y administrador
      rol:{
        type:DataTypes.ENUM,
        values:['user', 'admin'],
        defaultValue:'user'
      },
      active:{
        type:DataTypes.BOOLEAN,
        defaultValue:true,
        allowNull:true
      },
      detail:{
        type:DataTypes.STRING,
        allowNull:false
      },
    }
    // {
    //   timestamps: false,
    // }
  );
};
