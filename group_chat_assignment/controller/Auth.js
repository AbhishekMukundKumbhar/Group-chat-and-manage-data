const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../dao/db");
const { USER_EXIST } = require('../dao/query');
const {createUser} = require('../service/UserService');
const JWT_SECRET_KEY = 'kumbharam';

class Auth {

    signUp = async (req, res) => {
        const { name, mobileNo, password, isAdmin } = req.body;
        if (!name || !mobileNo || !password) {
            return res.status(422).json({ error: "please provide all the fields" });
        }
        try {
            let result = await createUser(name, mobileNo, password, isAdmin);
            if (result) {
                return res.status(200).json({ message: "Signup is sccessfull" });
            }
            else {
                return res.status(401).json({ error: 'Signup is failed' });
            }
        } catch (error) {
            res.status(422).json({ error: "Sign up failed due to " + error });
        }
    }

    signIn = async (req, res) => {
        const { mobileNo, password } = req.body;
        if (!mobileNo || !password) {
            return res.status(422).json({ error: "please provide all the fields" });
        }
        try {
            const userExist = await db(USER_EXIST, [mobileNo], {});
            if (userExist.rows.length == 0) {
                return res.status(422).json({ error: "invalid email or password" });
            } else {
                const userDetails = userExist.rows[0];
                const user = {
                    mobileNo: userDetails[0],
                    name: userDetails[1],
                    isAdmin: userDetails[3]
                }
                const doMatch = await bcrypt.compare(password, userDetails[2]);
                if (doMatch) {
                    let token = jwt.sign({ user: user }, JWT_SECRET_KEY);
                    return res.status(200).json({ message: "Successfully signed in", token, user });
                } else {
                    return res.status(422).json({ error: "invalid email or password" });
                }
            }
        } catch (error) {
            res.status(422).json({ error: "Sign in failed due to " + error });
        }
    }
}

module.exports = new Auth();