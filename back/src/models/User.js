const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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
        type: DataTypes.STRING,
        allowNull: true,
      },
      subscribed: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      followers: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      following: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    }
    // {
    //   timestamps: false,
    // }
  );
};
