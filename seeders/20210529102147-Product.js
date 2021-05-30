'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('Products', 
     [
       {
        id: 1,
        name: 'Taro Snack Net Seaweed Pck 70G',
        image_url: 'https://assets.klikindomaret.com/share/20055205/20055205_1.jpg',
        description: 'Rasa Seaweed ukuran 70 Gram',
        barcode_number: '1414100003',
        stock: 5,
        price: 9500,
        stockBefore: 5,
        createdAt: new Date(),
        updatedAt: new Date()
       },
       {
        id: 2,
        name: 'CHIKI BALLS Rasa Keju 200g',
        barcode_number: '8968659100',
        image_url: 'https://assets.klikindomaret.com/share/20101064_1.jpg',
        description: 'Chiki rasa keju ukuran 200 gram',
        stock: 10,
        price: 21400,
        stockBefore: 10,
        createdAt: new Date(),
        updatedAt: new Date()
       }
      ], {}) 
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Products', null, {});
  }
};
