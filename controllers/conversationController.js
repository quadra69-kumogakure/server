const { Conversation, Message, User, Participants } = require("../models");
const { Op } = require("sequelize");

class conversationController {
  static async displayConversations(req, res, next) {
    try {
      const UserId = req.user.id;

      // const conversations = await Conversation.findAll({
      //     include : {
      //         model : User,
      //         where: {
      //             id: UserId
      //         },
      //         // include: {
      //         //     // model: Participants
      //         // }
      //     }
      //     // include : {
      //     //     model : Participants,
      //     //     include : {
      //     //         model : User
      //     //     }
      //     // }
      // });

      const conversations = await Participants.findAll({
        where: {
          UserId,
        },
        include: {
          model: Conversation,
          include: [
            {
              model: Participants,
              as: "parti",
              include: [
                {
                  model: User,
                  where: {
                    id: {
                      [Op.not]: UserId,
                    },
                  },
                },
              ],
            },
            {
              model : Message
            }
          ],
        },
      });

      let details = [];

      conversations.forEach((participan) => {
        let detail = {};
        let user_list = [];
        let recent_message = {};
        detail.conversation_id = participan.ConversationId;
        participan.Conversation.parti.forEach((p) => {
          let { firstName, lastName, profilePicture } = p.User;
          user_list.push({ firstName, lastName, profilePicture });
        });

        recent_message = participan.Conversation.Messages[0];

        detail.user_list = user_list;
        detail.recent_message = recent_message;
        details.push(detail);
      });

      // let conversations = await Conversation.findAll({
      //     include: {
      //         model: Participants,
      //         as: "parti"
      //     }
      // })

      res.status(200).json({
        details,
        conversations,
      });
    } catch (error) {
      next(error);
    }
  }

  static async displayPerConversation(req, res, next) {
    try {
      const UserId = req.user.id;
      const ConversationId = req.params.id;

      if (!ConversationId) {
        res.status(200).json({
          message : "Data unavailable"
        });
        return
      };

      const user = await User.findByPk(UserId);

      const conversation = await Conversation.findByPk(ConversationId, {
        include: [
          {
            model: Participants,
            as : 'parti',
            include : {
              model : User,
              where: {
                id: {
                  [Op.not]: UserId,
                },
              },
            }
          },
          {
            model: Message,
            include : {
              model : User
            }
          },
        ],
      });


      res.status(200).json({
        current_user : user,
        conversation,
      });
    } catch (error) {
      next(error);
    }
  }

  static async addConversation(req, res, next) {
    try {
        
    } catch (error) {
      next(error);
    }
  }
}

module.exports = conversationController;
