const User = require("./User");

module.exports = (sequelize, DataTypes) => {
    const Todo = sequelize.define('Todo', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        todo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        adress: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dateStart: {
            type: DataTypes.DATE,
            allowNull: false
        },
        dateEnd: {
            type: DataTypes.DATE,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        allDay: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        driver_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Drivers',
                key: 'id'
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'id'
            }
        }
    });

    return Todo;
};