import bcrypt from 'bcrypt'

const hashPassword = async password => {

	try {
		const salt = await bcrypt.genSalt(10)
		const hash = await bcrypt.hash(password, salt)
		return hash
	} catch (e) {
		console.error(e)
	}
}

export default hashPassword
