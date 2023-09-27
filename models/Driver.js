module.exports = (sequelize, DataTypes) => {
    const Driver = sequelize.define('Driver', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Driver;
};