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
    const { senderId } = req.query

    if (!senderId) {
        res.json({
            code: constant.respStatus.INVALID,
            message: "Invalid input",
            error_code: constant.errorCode.INVALID,
        });

        return
    }

    const chatQueryResp = await Chat.find({
        senderId: senderId,
    })

    return res.status(200).send({
        code: constant.respStatus.OK,
        data: chatQueryResp,
        message: "Query chat successfully",
    })
}

module.exports = { createChatMessage, getChatMessage }
