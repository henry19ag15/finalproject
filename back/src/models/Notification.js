const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "notification",
    {
      autor: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      detail: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      about: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      visto: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      recieves: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    }
    // {
    //   timestamps: false,
    // }
  );
};
