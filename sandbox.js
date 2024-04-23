const {User, Conversation, Participants} = require('./models');

async function fetchConversation() {
    try {
        const conversations = await Conversation.findAll({
            include : {
                model : Participants,
                where : {
                    UserId : 2
                }
            }
        });

        console.log(conversations);
    } catch (error) {
        console.log(error);
    }
};

// async function fetchConversation() {
//     try {
//       const data = await Conversation.findAll({
//         include: {
//           model: Participants,
//           where: { UserId: 2 }, // Filter Participants by user ID
//           include: {
//             model: User, // Include User model
//           }
//         }
//       });
  
//       const conversationsWithParticipants = data.map(conversation => ({
//         ...conversation, // Include conversation details
//         participants: conversation.Participants.map(participant => participant.User) // Extract and map User objects from participants
//       }));
  
//       console.log(conversationsWithParticipants); // This will show conversations with participating users
//     } catch (error) {
//       console.log(error);
//     }
//   }
  

fetchConversation();
const a = {
    "current_user": 1,
    "conversation": {
        "id": 1,
        "name": "",
        "createdAt": "2024-04-19T03:19:48.500Z",
        "updatedAt": "2024-04-19T03:19:48.500Z",
        "parti": [
            {
                "UserId": 2,
                "ConversationId": 1,
                "createdAt": "2024-04-19T03:19:48.507Z",
                "updatedAt": "2024-04-19T03:19:48.507Z",
                "User": {
                    "id": 2,
                    "email": "pstickler1@salon.com",
                    "password": "$2a$10$DFyztvVXWprEIHEXdwpvguNiWZmEhpN2JpeyGyCmkug53Fhb87yaG",
                    "firstName": "Pru",
                    "lastName": "Stickler",
                    "profilePicture": "http://dummyimage.com/182x100.png/cc0000/ffffff",
                    "createdAt": "2024-04-19T03:19:48.185Z",
                    "updatedAt": "2024-04-19T03:19:48.185Z"
                }
            },
            {
                "UserId": 3,
                "ConversationId": 1,
                "createdAt": "2024-04-19T03:19:48.507Z",
                "updatedAt": "2024-04-19T03:19:48.507Z",
                "User": {
                    "id": 3,
                    "email": "apaja@salon.com",
                    "password": "$2a$10$DFyztvVXWprEIHEXdwpvguNiWZmEhpN2JpeyGyCmkug53Fhb87yaG",
                    "firstName": "Apa",
                    "lastName": "Aja",
                    "profilePicture": "http://dummyimage.com/182x100.png/cc0000/ffffff",
                    "createdAt": "2024-04-19T03:19:48.185Z",
                    "updatedAt": "2024-04-19T03:19:48.185Z"
                }
            }
        ],
    }
}
 