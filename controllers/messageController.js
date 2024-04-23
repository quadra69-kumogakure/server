
const { Message, User, Conversation} = require('../models');

class messageController {

    static async addMessage(req, res, next) {
        try {
            const SenderId = req.user.id;
            const {message, ConversationId} = req.body;

            const conversationId = +ConversationId;
    
            const newMessage = await Message.create({
                SenderId,
                message,
                ConversationId : conversationId
            });
    
            res.status(201).json({
                newMessage
            });
        } catch (error) {
            next(error)
        }
    };
};

module.exports = messageController;