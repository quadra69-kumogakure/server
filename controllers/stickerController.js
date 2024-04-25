const {Sticker} = require('../models');

class stickerController {

    static async getStickers(req, res, next) {
        try {
            const stickers = await Sticker.findAll();

            res.status(200).json(stickers);
        } catch (error) {
            next(error)
        }
    };
};

module.exports = stickerController;