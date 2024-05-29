'use strict';
const bcrypt = require("bcryptjs");
const dataSeed = require("../data.json");

/*@type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const userData = dataSeed.Users.map((e) => ({
      ...e,
      password: bcrypt.hashSync(e.password),
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    await queryInterface.bulkInsert('Users', userData, {});

    const categoriesData = dataSeed.Categories.map((e) => ({
      ...e,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    await queryInterface.bulkInsert('Categories', categoriesData, {});

    const itemsData = dataSeed.Items.map((e) => ({
      ...e,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    await queryInterface.bulkInsert("Items", itemsData, {});

    const ingredientsData = dataSeed.Ingredients.map((e) => ({
      ...e,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    await queryInterface.bulkInsert("Ingredients", ingredientsData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Ingredients", null, {});
    await queryInterface.bulkDelete("Items", null, {});
    await queryInterface.bulkDelete("Categories", null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};
