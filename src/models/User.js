import { DataTypes } from 'sequelize'
import sequelize from '../database/config.js'

const User = sequelize.define('User', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	email: {
		type: DataTypes.STRING(50),
		unique: true,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING(255),
		allowNull: false,
	}
})

export default User
