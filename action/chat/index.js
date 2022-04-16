const Chat = require("../../model/chat")
const constant = require('../../constant');

const createChatMessage = async (req, res) => {
    const chat = new Chat(req.body)

    chat.save((err, _) => {
        if (err) {
            return res.status(400).send({
                code: constant.respStatus.INVALID,
                message: err.message,
                error_code: constant.errorCode.FAILED_ACTION,
            })
        } else {
            return res.status(200).send({
                code: constant.respStatus.OK,
                message: "Create chat successfully",
            })
        }
    })
}

const getChatMessage = async (req, res) => {
    const { userId } = req.query

    if (!userId) {
        res.json({
            code: constant.respStatus.INVALID,
            message: "Invalid input",
            error_code: constant.errorCode.INVALID,
        });

        return
    }

    const chatQueryResp = await Chat.find({
        senderId: userId,
    })

    const receiveChatQueryResp = await Chat.find({
        receiverId: userId,
    })

    const allChatQueryResp = chatQueryResp.concat(receiveChatQueryResp)
    const sortedChatConversation = allChatQueryResp.sort((a,b) => a.createdTime - b.createdTime)

    return res.status(200).send({
        code: constant.respStatus.OK,
        data: sortedChatConversation,
        message: "Query chat successfully",
    })
}

module.exports = { createChatMessage, getChatMessage }
