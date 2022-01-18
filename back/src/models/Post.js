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
        allowNull: false,
      },
      creator: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      likes: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
        allowNull: true,
      },
    }
    // {
    //   timestamps: false,
    // }
  );
};
