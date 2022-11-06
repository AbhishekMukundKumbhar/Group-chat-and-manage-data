const db = require("../dao/db");
const { USER_EXIST, INSERT_USER } = require('../dao/query');
const bcrypt = require("bcrypt");

class UserService {
    hashingPassword = async (password) => {
        try {
            const hashedPass = await bcrypt.hash(password, 12);
            return hashedPass;
        } catch (error) {
            throw error;
        }
    }

    createUser = async (name, mobileNo, password, isAdmin) => {
        try {
            const userExist = await db(USER_EXIST, [mobileNo], {});
            if (userExist.rows.length !== 0) {
                throw Error("user already exist");
            }
            const hashedPassword = await this.hashingPassword(password);
            let result = await db(INSERT_USER, [mobileNo, `${name}`, `${hashedPassword}`, isAdmin], { autoCommit: true });
            return result;
        } catch (error) {
            throw error;
        }
    }

    mapUserDetails = (details) => {
        let userDetails = details.map((user) => {
            return (
                {
                    userMobile: user[0],
                    userName: user[1],
                    isAdmin: user[3]
                }
            )
        });
        return userDetails;
    }
}
module.exports = new UserService();