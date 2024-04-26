const { PurchasedSticker, Sticker } = require('../models');

class purchasedStickerController {

    static async addSticker (req, res, next) {
        try {
            const StickerId = req.params.id;
            const UserId = req.user.id;
            
            const isPurchased = await PurchasedSticker.findOne({
                where : {
                    UserId,
                    StickerId
                }
            });

            if (isPurchased) {
                throw {name : "Input Not Allowed"}
            };

            const purchased = await PurchasedSticker.create({
                StickerId,
                UserId
            });

            res.status(201).json(purchased);
        } catch (error) {
            next(error);
        }
    };

    static async getInventory (req, res, next) {
        try {
            const UserId = req.user.id;

            const inventory = await PurchasedSticker.findAll({
                where : {
                    UserId
                },
                include : {
                    model : Sticker
                }
            });

            res.status(200).json(inventory);
        } catch (error) {
            next(error);
        }
    };
};

module.exports = purchasedStickerController;