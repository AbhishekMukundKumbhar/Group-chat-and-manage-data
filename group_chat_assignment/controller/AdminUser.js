const {createUser, mapUserDetails} = require('../service/UserService');
const { USER_EXIST, GET_ALL_USERS } = require('../dao/query');
const db = require("../dao/db");
class AdminUser{
    createNewUser = async(req, res) => {
        const { name, mobileNo, password, isAdmin } = req.body;
        if (!name || !mobileNo || !password) {
            return res.status(422).json({ error: "please provide all the fields" });
        }
        try {
            let result = await createUser(name, mobileNo, password, isAdmin);
            if (result) {
                return res.status(200).json({ message: "user created sccessfull" });
            }
            else {
                return res.status(401).json({ error: 'user creation is failed' });
            }
        } catch (error) {
            return res.status(404).json({ error: "creating user is failed due to " + error });
        }
    }

    editUser = async(req, res) => {
        let keys = Object.keys(req.body);
        const {mobileNo} = req.body;
        const updatingField = keys[0];
        const updatingValue = req.body[keys[0]];
        if(!mobileNo){
            return res.status(422).json({ error: "please provide updating user mobile no" });
        }
        try {
            const userExist = await db(USER_EXIST, [mobileNo], {});
            if (userExist.rows.length == 0) {
                return res.status(422).json({ error: "user doesn't exist with given number" });
            }
            else{
                let query = `update CHATUSERS SET ${updatingField} = :1 WHERE USER_MOBILE_NUMBER = :2`;
                const result = await db(query, [updatingValue,mobileNo], {autoCommit: true});
                res.json({message : "user updated successfully"});
            }
        } catch (error) {
            res.status(404).json({ error: "creating user is failed due to " + error });
        }
    }

    getAllUsers = async(req, res) =>{
        try {
            const result = await db(GET_ALL_USERS, [], {});
            let userDetails = [];
            if (result.rows.length == 0) {
                userDetails = [];
            } else {
                userDetails = await mapUserDetails(result.rows);
            }
            return res.status(200).json({ message: "user details fetched successfully", data : userDetails });

        } catch (error) {
            return res.status(422).json({ error: "failed to fetch user details due to " + error });
        }
    }
}

module.exports = new AdminUser();