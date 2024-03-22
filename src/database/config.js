import path from 'path'
import { Sequelize } from 'sequelize'

const { pathname: __dirname } = new URL('../database', import.meta.url)

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: path.join(process.cwd(), 'src/database/db.sqlite')
})

export default sequelize
