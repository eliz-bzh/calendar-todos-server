module.exports = (sequelize, DataTypes) => {
    const Todo = sequelize.define('Todo', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            primaryKey: true,
            allowNull: false
        },
        todo: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Todo;
};