import bcrypt from 'bcryptjs'
import Sequelize from 'sequelize'
import BaseModel from './BaseModel'

class User extends BaseModel {
    static init (sequelize) {
        super.init(
            {
            // Attributes
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.VIRTUAL,
                password_hash: Sequelize.STRING,
                provider: Sequelize.BOOLEAN,
            //
            },
            { sequelize },
        )

        this.addHook('beforeSave', async (user) => {
            if (user.password) {
                user.password_hash = await bcrypt.hash(user.password, 8)
            }
        })

        return this
    }

    // Verify if email exists
    static async hasEmail (email) {
        return !!await User.findOne({ where: { email } })
    }

    // Check if password is correct
    async checkPassword (password) {
        if (!password) { return false }

        return bcrypt.compare(password, this.password_hash)
    }
}

export default User
