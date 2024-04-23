
const { Contact,User } = require('../models');

class contactController {
    static async displayContacts(req, res, next) {
        try {
            const UserId = req.user.id;

            const contacts = await Contact.findAll({
                where : {
                    UserId 
                },
                include : {
                    model : User
                }
            });

            res.status(200).json({
                contacts
            });
        } catch (error) {
            next(error);
        };
    };

    static async addNewContact(req, res, next) {
        try {
            const UserId = req.user.id;
            const {FriendId} = req.body;

            const friend = await User.findByPk(FriendId);

            if (!friend) {
                throw {name : "Not Found"}
            };

            if (FriendId === UserId) {
                throw {name : "Input Not Allowed"}
            }

            const isFriend = await Contact.findOne({
                where : {
                    UserId,
                    FriendId
                }
            });

            if (isFriend) {
                throw {name : "Input Not Allowed"}
            }

            const newContact = await Contact.create({
                UserId,
                FriendId 
            });

            res.status(201).json({
                message : "Contact succesfully added",
                data : newContact
            });
        } catch (error) {
            next(error);
        }
    }

    static async displayPerContact(req, res, next) {
        try {
            const UserId = req.user.id;
            const FriendId = req.params.id;

            const contact = await Contact.findOne({
                where : {
                    UserId,
                    FriendId
                }
            });

            res.status(200).json({
                contact
            })
        } catch (error) {
            next(error);
        };
    };

    static async changeContactName(req, res, next) {
        try {
            const UserId = req.user.id;
            const FriendId = req.params.id;
            const {alias} = req.body;

            const contact = await Contact.findOne({
                where : {
                    UserId,
                    FriendId
                }
            });

            if (!contact) {
                throw {name : "Not Found"}
            };

            const updatedContact = await contact.update(alias);

            res.status(200).json({
                message : "Contact name updated",
                friend : updatedContact
            });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = contactController;