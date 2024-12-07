"use strict";

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

    await queryInterface.bulkInsert("users", [
      {
        uuid: "28606bad-542f-41b5-9a09-c3c617807096",
        username: "Janedoe",
        email: "janedoe@gmail.com",
        password: "p4ssw0rd()",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        uuid: "28606bad-542f-41b5-9a09-c3c617707096",
        username: "AlfredChi",
        email: "alfred008@gmail.com",
        password: "p4ssw0rd()",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        uuid: "28606bad-542f-41b5-9a09-c3c407707096",
        username: "Saucebot",
        email: "saucebot@gmail.com",
        password: "p4ssw0rd",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
