const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "comment",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            detail: {
                type:DataTypes.STRING,
                allowNull:true
            },
            autorId: {
                type:DataTypes.STRING,
                default:[],
                allowNull:true
            },
            idPost: {
                type:DataTypes.STRING,
                allowNull:true
            }
        }
        // {
        //   timestamps: false,
        // }
    );
};
