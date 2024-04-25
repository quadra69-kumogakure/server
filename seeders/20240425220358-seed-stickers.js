"use strict";
const axios = require("axios");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const { data } = await axios({
      method: "GET",
      url: "https://messenger.stipop.io/v1/search",
      headers: {
        apikey: "c249b161249f7b8802d55eddc2d7e566",
      },
      params: {
        userId: "9937",
        q: "Excited",
      },
    });

    const response = data.body.stickerList;
    const stickers = response.map((el) => {
      const { keyword, stickerImg } = el;

      return { 
        title : keyword, 
        url : stickerImg,
        createdAt : new Date(),
        updatedAt : new Date()
      };
    });

    await queryInterface.bulkInsert('Stickers', stickers);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Stickers', stickers, {});
  },
};
