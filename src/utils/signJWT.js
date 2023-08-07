import jwt from 'jsonwebtoken'

const signJWT = async payload => {
	const { id, email } = payload

	const claims = JSON.stringify({
		iss: 'api',
		id,
		email,
		iat: Math.floor(Date.now() / 1000),
		exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7)
	})

	return await jwt.sign(claims, process.env.JWT_SECRET)
}

export default signJWT
