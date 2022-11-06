const { CREATE_GROUP, ADD_USER_GROUP, GET_GROUP_ID, GROUP_EXIST, DELETE_GROUP, DELETE_GROUP_ID, SEARCH_GROUP, GET_GROUPS, GET_GROUP_MEMBERS } = require('../dao/query');
const db = require("../dao/db");
class Groups {
    createGroup = async (req, res) => {
        const { groupName } = req.body;
        const { mobileNo, name } = req.user;
        if (!groupName) {
            return res.status(422).json({ error: "please provide group name" });
        }
        try {
            let created = await db(CREATE_GROUP, [groupName, mobileNo], { autoCommit: true });
            if (created) {
                const result = await db(GET_GROUP_ID, [groupName, mobileNo], {});
                const group_id = result.rows[0];
                let added = await db(ADD_USER_GROUP, [group_id[0], name, mobileNo], { autoCommit: true });
                if (added) {
                    return res.status(200).json({ message: 'group is created successfully' });
                } else {
                    console.log("adding user is failed");
                }
            }
            else {
                console.log("creating group is failed");
                return res.status(401).json({ error: 'creating group is failed' });
            }
        } catch (error) {
            res.status(422).json({ error: "creating group is failed due to " + error });
        }
    }

    deleteGroup = async (req, res) => {
        const { groupid } = req.params;
        const { mobileNo, name } = req.user;
        if (!groupid) {
            return res.status(422).json({ error: "please provide group details" });
        }
        try {
            const groupExist = await db(GROUP_EXIST, [groupid, mobileNo], {});
            if (groupExist.rows.length == 0) {
                return res.status(403).json({ error: "user don't have access to delete" });
            }
            const detailsDelete = await db(DELETE_GROUP_ID, [groupid], { autoCommit: true });
            if (detailsDelete) {
                const groupDelete = await db(DELETE_GROUP, [groupid], { autoCommit: true });
                if (groupDelete)
                    return res.status(200).json({ message: "group is deleted successfully" });
            }
        } catch (error) {
            return res.status(422).json({ error: "deleteing group is failed due to " + error });
        }
    }
    mapGroupDetails = (details) =>{
         let groupDetails= details.map((group) => {
            return (
                {
                    groupId: group[0],
                    groupName: group[1],
                    createdBy: group[2]
                }
            )
        });
        return groupDetails;
    }

    getAllGroups = async(req, res) =>{
        try {
            const result = await db(GET_GROUPS, [], {});
            let groupDetails = [];
            if (result.rows.length == 0) {
                groupDetails = [];
            } else {
                groupDetails = await this.mapGroupDetails(result.rows);
            }
            return res.status(200).json({ message: "group details fetched successfully", data : groupDetails });

        } catch (error) {
            return res.status(422).json({ error: "failed to fetch details due to " + error });
        }
    }

    searchGroup = async (req, res) => {
        const { searchQuery } = req.params;
        if (!searchQuery || searchQuery == "") {
            return res.status(422).json({ error: "please provide search string" });
        }
        try {
            const query = `%${searchQuery}%`;
            const result = await db(SEARCH_GROUP, [query], {});
            let groupDetails = []
            if (result.rows.length == 0) {
                groupDetails = [];
            } else {
                groupDetails = await this.mapGroupDetails(result.rows);
            }
            return res.status(200).json({ message: "group details fetched successfully", data : groupDetails });
        } catch (error) {
            return res.status(422).json({ error: "search is failed due to " + error });
        }
    }

    addUserToGroup = async(req, res) => {
        const { groupid } = req.params;
        const {memName, memNumber} = req.body;
        if(!groupid || !memName || !memNumber){
            return res.status(422).json({ error: "please provide all the details" });
        }
        try {
            let result = await db(ADD_USER_GROUP, [groupid, memName, memNumber], { autoCommit: true });
            if(result){
                return res.status(200).json({ message: 'user is added to group successfully' });
            }
        } catch (error) {
            return res.status(422).json({ error: "adding user to group is failed due to " + error });
        }
    }

    getAllGroupMembers = async(req, res) => {
        const { groupid } = req.params;
        if(!groupid){
            return res.status(422).json({ error: "please provide group details" });
        }
        try {
            const result = await db(GET_GROUP_MEMBERS, [groupid], {});
            let memberDetails = result.rows.map(member =>{
                return {
                    memberName:member[1],
                    memberNumber:member[2]
                }
            });
            return res.status(200).json({ message: "group members details fetched successfully", data : memberDetails });
        } catch (error) {
            return res.status(422).json({ error: "fetching member details is failed due to " + error });
        }
    }
}
module.exports = new Groups();