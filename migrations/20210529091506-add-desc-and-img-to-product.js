'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.addColumn('Products', 'image_url', Sequelize.TEXT),
      await queryInterface.addColumn('Products', 'description', Sequelize.STRING)
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn('Products', 'image_url'),
      await queryInterface.removeColumn('Products', 'description')
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error); 
    }
  }
};
