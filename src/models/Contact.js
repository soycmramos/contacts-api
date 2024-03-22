import { DataTypes } from 'sequelize'
import sequelize from '../database/config.js'

const Contact = sequelize.define('Contact', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	name: {
		type: DataTypes.STRING(50),
		allowNull: false,
	},
	phone: {
		type: DataTypes.STRING(15),
		allowNull: false
	}
})

export default Contact
