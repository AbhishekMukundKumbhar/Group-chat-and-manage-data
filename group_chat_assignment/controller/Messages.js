const db = require("../dao/db");
const {SEND_MESSAGE,GET_ALL_MESSAGES} = require("../dao/query")

class Messages{
    sendMessage = async(req, res) => {
        const {groupid} = req.params;
        const {messageText} = req.body;
        const {mobileNo, name} = req.user;
        if(!groupid){
            return res.status(422).json({ error: "please provide group details" });
        }
        try {
            const result = await db(SEND_MESSAGE,[groupid,messageText,name, mobileNo],{autoCommit : true});
            if(result){
                return res.status(200).json({ message: 'message sent successfully' });
            }
        } catch (error) {
            res.status(422).json({ error: "message not sent due to " + error });
        }
    }
    mapingMesages = (messages)=>{
        let messageDetails = messages.map(message=>{
            return({
                senderName : message[2],
                senderNumber : message[3],
                messageText : message[1]
            })
        });
        return messageDetails;
    }

    getAllMessages = async(req, res) =>{
        const {groupid} = req.params;
        if(!groupid){
            return res.status(422).json({ error: "please provide group details" });
        }
        try {
            const result = await db(GET_ALL_MESSAGES,[groupid],{});
            let messageDetails = [];
            if(result.rows.length == 0){
                messageDetails = []; 
            }else{
                messageDetails = this.mapingMesages(result.rows);
            }
            return res.status(200).json({ message: 'message fetched successfully', data :messageDetails });
        } catch (error) {
            res.status(422).json({ error: "message not fetched due to " + error });
        }
    }
}
module.exports = new Messages();