const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//create User model
class User extends Model {}

//define table columns and configuration
User.init(
    {
        //Table column definition here
        id: {
            //use special Sequelize DataTypes object provide what type data it is
            type: DataTypes.INTEGER,
            //this is equivalent of SQL Not Null opt
            allowNull: false,
            //instrct that this is Primary Key
            primaryKey: true,
            //turn on auto increment
            autoIncrement: true
        },
        //define username
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        //define password
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                //this means password must be at least four characters
                len: [4]
            }
        }
    },
    {
        //Table configuraton options here (https://sequelize.org/v5/manual/models-definition.html#configuration)

        //pass in our imported sequelize connection
        sequelize,
        //dont automatically create createdAt/updatedAt timestamp fields
        timestamps: false,
        //don't pluralize name of db table
        freezeTableName: true,
        // use underscore instead of camel-casing
        underscored: true,
        // make it so model name is lowercase
        modelName: 'user'
    }

);

module.exports = User;