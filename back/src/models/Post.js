const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "post",
    {
      photo: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      detail: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      private: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
    }
    // {
    //   timestamps: false,
    // }
  );
};
