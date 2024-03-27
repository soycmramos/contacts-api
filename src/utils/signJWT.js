import jwt from 'jsonwebtoken'

const signJWT = async ({ id, email }) => {
	const token = await jwt.sign(JSON.stringify({
		iss: 'management-contacts-api',
		iat: Math.floor(Date.now() / 1000),
		exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7),
		id,
		email
	}), process.env.JWT_SECRET)

	return token
}

export default signJWT
