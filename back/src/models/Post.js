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
      media: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      like: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
        allowNull: true,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: true,
      },
    }
    // {
    //   timestamps: false,
    // }
  );
};
