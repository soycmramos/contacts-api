import app from './app.js'
import sequelize from './database/config.js'

app.listen(app.get('port'), () => {
	console.log(`Server running on http://localhost:${app.get('port')}`)
})

try {
	sequelize.sync()
	console.log('Database connection successful')
} catch (error) {
	console.error('Unable to connect to the database', error)
}
