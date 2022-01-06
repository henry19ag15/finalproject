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
        defaultValue:[],
        allowNull: true,
      },
      following: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue:[],
        allowNull: true,
      },
    }
    // {
    //   timestamps: false,
    // }
  );
};
