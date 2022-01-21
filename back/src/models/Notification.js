const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "notification",
    {
      autor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      detail: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      about: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      visto: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      recieves: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }
    // {
    //   timestamps: false,
    // }
  );
};
