const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "post",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      post: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      creator: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      like: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    }
    // {
    //   timestamps: false,
    // }
  );
};
