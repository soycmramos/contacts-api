export default {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Contacts API',
			version: '1.0.0'
		},
		server: {
			url: 'http://localhost'
		}
	},
	apis: [
		'./src/routes/contacts/index.js',
		'./src/routes/default.js'
	]
}
